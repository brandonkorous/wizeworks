# Deploying the WizeWorks site

**Cluster:** `aks-sparx-prod-cus` (resource group `rg-sparx-prod-cus`, centralus)
**Namespace:** `wizeworks`
**Image:** `ghcr.io/brandonkorous/wizeworks-site`

WizeWorks is a **co-tenant** on the shared sparx cluster, the same way silicaui,
kanninja, jotacular and agconn are: its own namespace, its own repository, its
own image. The only shared thing is the cluster and the single Caddy routing
table, which lives in the **sparx repo**, not here.

```
push to main  →  verify (typecheck + build)
              →  build & push image to GHCR, tagged sha-<short> and latest
              →  az login (OIDC)  →  kustomize set image <sha>  →  kubectl apply -k
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

## Prerequisites — none of these are code

- [ ] **Azure federated credential.** The workflow authenticates with no stored
      secret, so the app registration needs a credential whose subject is
      `repo:brandonkorous/wizeworks:ref:refs/heads/main`. Without it
      `azure/login` fails with AADSTS70021.
- [ ] **Repository variables** (variables, not secrets — they are public
      identifiers and hiding them only makes a failed run harder to read):
      `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`.
- [ ] **Azure RBAC** for that identity: pull AKS credentials and write into the
      `wizeworks` namespace.
- [ ] **Make the GHCR package public** after the first push. Nothing here
      carries an `imagePullSecret` because the kubelet pulls anonymously — a
      private package fails as `ImagePullBackOff` with a 401 that reads like a
      missing tag.
- [ ] **DNS.** `wize.works` and `www.wize.works` at the cluster ingress IP —
      the same address `admin.wize.works` already points at.

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

## Things deliberately not configured

- **Contact-form delivery.** `/api/contact` validates and returns 503 rather
  than accepting a message it cannot deliver. Set `CONTACT_TO` and
  `CONTACT_EMAIL` in the Deployment (or a Secret) and implement `deliver()`.
- **Analytics.** Events are defined and fire into a no-op seam; no provider is
  installed and nothing is sent. Connecting one is a privacy decision and
  changes what `/privacy` must say.
