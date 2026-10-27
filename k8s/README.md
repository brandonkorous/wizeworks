# Deploying WizeWorks

**Cluster:** `aks-sparx-prod-cus` (resource group `rg-sparx-prod-cus`, centralus)
**Namespace:** `wizeworks`

| App | Host | Image | Manifests |
|---|---|---|---|
| site | `wize.works` | `ghcr.io/brandonkorous/wizeworks-site` | `k8s/site/` |
| admin | `admin.wize.works` | `ghcr.io/brandonkorous/wizeworks-admin` | `k8s/admin/` |

`k8s/namespace.yaml` is applied on its own before either app. Admin's secrets
and its links into sparx-prod are in `admin/README.md`.

WizeWorks is a **co-tenant** on the shared sparx cluster, the same way silicaui,
kanninja, jotacular and agconn are: its own namespace, its own repository, its
own image. The only shared thing is the cluster and the single Caddy routing
table, which lives in the **sparx repo**, not here.

```
push to main  →  verify (typecheck + build)
              →  build & push image to GHCR, tagged sha-<short> and latest
              →  az login (OIDC)  →  kustomize set image <sha>  →  kubectl apply -k k8s/<app>
              →  rollout status   →  in-cluster smoke test of /api/health
```

---

## ⚠ Two changes live in the sparx repo, not this one

A green rollout here does **not** make `wize.works` resolve. Both of these are
already written but must be **applied from the sparx repo**:

| File (in `sparx.works`) | Change |
|---|---|
| `k8s/ingress/Caddyfile` | `wize.works` → `site.wizeworks.svc.cluster.local:80`, plus a `www` redirect |
| `wizeworks/services/api-rest/src/routes/internal/domain-check.ts` | `wize.works` and `www.wize.works` added to the static platform hosts |

**Both are required, and the second is the one that bites.** Caddy uses
on-demand TLS and asks api-rest whether a hostname may be issued a certificate.
Without the allow-list entry the ask endpoint denies it and the site presents a
**TLS error, not a 404** — which reads like a certificate problem rather than a
missing config line. The Caddyfile calls this pairing out in both directions for
exactly that reason.

### Order matters

1. **This repo first.** The workflow creates the namespace, Deployment and
   Service. Until the Service exists, the Caddy route proxies into nothing and
   the host 502s. (That is precisely how `admin.wize.works` broke — a route
   pointing at a namespace that was never recreated on AKS.)
2. **Then the sparx repo**, which rolls both Caddy and api-rest.

---

## Prerequisites — almost all of it is code

**Almost all of this is Terraform, in the sparx repo.** It is provisioned the
same way jotacular, kanNINJA and AGCONN are — no secrets are stored in GitHub
at any point.

| What | Where | State |
|---|---|---|
| App registration, service principal, federated credentials | `terraform/bootstrap-azure/wizeworks.tf` | written |
| AKS `Cluster User` role assignment | same file | written |
| `wize.works` + `www` DNS records | `terraform/modules/dns/main.tf` | written, gated |
| DNS cutover switch | `terraform/envs/azure/ingress.tf` | `wizeworks_dns_enabled = false` |
| Caddy route | `k8s/ingress/Caddyfile` | written |
| On-demand TLS allow-list | `.../internal/domain-check.ts` | written |

Apply `bootstrap-azure` first (it grants roles, which the release identity
cannot do), then `envs/azure`.

### The only two manual steps

- [ ] **Set three repository variables.** `terraform output wizeworks_github_setup`
      prints the exact `gh variable set` commands. These are VARIABLES, not
      secrets — a client id identifies an application and authenticates nothing
      without a matching federated subject.
- [ ] **Make the GHCR package public**, once, after the first image is pushed.
      The workflow checks this for you: a `verify-pullable` job does an
      anonymous manifest fetch — the same path the kubelet takes — and fails
      with the fix attached rather than letting the rollout discover it as an
      `ImagePullBackOff`.

      **A 404 from that job is not automatically a visibility problem.** GHCR
      answers unauthorised anonymous fetches with 404 rather than 401, so the
      same status covers a private package, a missing tag, AND an `Accept`
      header that does not name the manifest's media type. The image here is
      single-platform, so its manifest is a plain
      `application/vnd.oci.image.manifest.v1+json` — asking for only the
      multi-arch index types 404s a perfectly public, perfectly pullable image.
      That cost a deploy cycle on 2026-08-28. The job now runs an anonymous tag
      list to separate the three cases and names which one it hit.

### The federated subject has numeric ids

`repo:brandonkorous@13042540/wizeworks@1349021052`

GitHub qualifies the OIDC subject per repository, by age. AgConnect and kanninja
are old enough to keep the plain `repo:owner/name` form; jotacular and this repo
get the qualified one. Copying a sibling's blindly produces a credential that
never matches, and Entra reports only the subject it received. The Terraform
default was read back with:

```bash
gh api repos/brandonkorous/wizeworks/actions/oidc/customization/sub --jq .sub_claim_prefix
```

### A note on TLS for this zone

`wize.works` is on Cloudflare SSL mode **`full`**, which accepts any origin
certificate without verifying it. The apex uses ordinary on-demand issuance via
`import tls_policy`.

Do **not** copy `admin.wize.works`'s `import tls_admin_origin` onto it. That
snippet exists because Cloudflare Access sits in front of the admin console and
intercepts the ACME challenge path, so Let's Encrypt can never complete there.
The apex has no Access policy. Borrowing the directive would make this block
depend on a mounted certificate secret it does not need — and Caddy fails config
load as a **unit**, so one missing file takes down all ~40 hostnames. That
happened on 2026-08-01.

---

## Verifying by hand

```bash
az aks get-credentials -g rg-sparx-prod-cus -n aks-sparx-prod-cus
kubectl -n wizeworks get pods,svc
kubectl -n wizeworks logs -l app.kubernetes.io/name=site --tail=50

# Does the container serve, independent of ingress?
kubectl run smoke --rm -i --restart=Never -n wizeworks \
  --image=curlimages/curl:8.10.1 --command -- \
  curl -fsS http://site.wizeworks.svc.cluster.local/api/health
```

If that passes and `https://wize.works` does not, the problem is in the sparx
repo — the Caddy route, the TLS allow-list, or DNS. Not here.

---

## Why the image is small, and why that matters

`next.config.ts` sets `output: "standalone"`, so the runtime stage copies a
23 MB traced bundle instead of a full dependency tree.

This is a reliability property, not tidiness. The cluster is a **single node
with a 110 GB ephemeral disk**, and a rolling update holds two image generations
at once. sparx put that node into DiskPressure on 2026-08-02 with fat images and
its entire worker fleet sat in `ImagePullBackOff` while the kubelet could not
reclaim the generations still in use.

`.dockerignore` also excludes `docs/` and `images/` — the repo root carries
~146 MB of concept mockups that the site never reads, which would otherwise be
uploaded as build context on every run.

## Tracing (WizeLens)

The site sends traces to WizeLens Cloud (`app.wizelens.com`), project
`wizeworks`, service `wizeworks-site`. Send-only: with `NODE_ENV=production` the
add-on serves no dashboard, and it keeps a quarter of requests
(`WIZELENS_SAMPLE_RATE=0.25`). Kubelet health probes are not traced.

The ingest key is the site's one secret. The deploy workflow reads
`wizelens-key-wizeworks-site` from the vault named by the `AZURE_KEY_VAULT_NAME`
repository variable and writes it into the `site-secrets` Secret as
`WIZELENS_KEY_WIZEWORKS_SITE`, which the Deployment maps to `WIZELENS_HUB_TOKEN`.
Every part is optional: no variable, no key, or no read access, and the site
rolls out untraced.

```bash
az keyvault secret set --vault-name <vault> --name wizelens-key-wizeworks-site --value <wl_ik_…>
gh variable set AZURE_KEY_VAULT_NAME -R brandonkorous/wizeworks -b '<vault>'
```

The `gha-wizeworks-prod` identity needs `Key Vault Secrets User` on that vault.
That grant is Terraform in the sparx repo (`terraform/bootstrap-azure/wizeworks.tf`).

In development (`pnpm dev`) tracing is on, with the dashboard at `/_wizelens`
and the HUD on the page.

## Things deliberately not configured

- **Contact-form delivery.** `/api/contact` validates and returns 503 rather
  than accepting a message it cannot deliver. Set `CONTACT_TO` and
  `CONTACT_EMAIL` in the Deployment (or a Secret) and implement `deliver()`.
- **Analytics.** Events are defined and fire into a no-op seam; no provider is
  installed and nothing is sent. Connecting one is a privacy decision and
  changes what `/privacy` must say.
