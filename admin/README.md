# admin — the WizeWorks operator console

`admin.wize.works`. WizeWorks staff use it to run sparx: tenants, users,
billing, domains, partners, feedback, announcements.

It came out of the sparx monorepo (`wizeworks/apps/admin`) on 2026-10-27 so it
could change on its own. The shared code it was built on came with it and now
lives in `packages/`. Those copies are this app's own: sparx keeps changing its
copies, and nothing syncs them.

```
pnpm install
pnpm dev           # http://localhost:3002
pnpm -r --include-workspace-root typecheck
pnpm -r --include-workspace-root test
```

## What still crosses into sparx

The console runs in the `wizeworks` namespace but works on sparx data. Three
contracts cross the repos. When one changes in sparx, change this app in step.

| Contract | sparx side | This side |
|---|---|---|
| Operator API | api-rest `/internal/operator/*` routes | `packages/operator` (the client) |
| Operator sign-in tables | `wize_admin` migrations in `wizeworks/packages/db/prisma/migrations` | `packages/operator-auth` (Better Auth over Kysely) |
| Operator emails | email-worker renders `email.send` | `packages/operator-auth/src/email.ts` publishes it on NATS |

The sign-in tables are the one that bites. Better Auth writes whatever columns
its plugins declare, and the tables are created by sparx migrations. Upgrading
`better-auth` here can need a migration there first. 1.6.33 did: it added two
2FA columns, and every operator sign-in failed until sparx PR #143.
`packages/operator-auth/src/two-factor-columns.test.ts` lists the columns sparx
has and fails when the plugin wants more.

## Secrets

The deploy reads these from Key Vault `kv-wizeworks-prod-cus` into the
`admin-secrets` Secret (see `.github/workflows/deploy.yml`):

| Env | Vault secret | |
|---|---|---|
| `OPERATOR_DATABASE_URL` | `operator-database-url` | required |
| `OPERATOR_AUTH_SECRET` | `operator-auth-secret-b64` | required, stored as base64 |
| `SPARX_INTERNAL_OPERATOR_TOKEN` | `sparx-internal-operator-token` | required |
| `OPERATOR_BOOTSTRAP_PASSWORD` | `operator-bootstrap-password` | optional |
| `NEXT_ACTIONS_KEY_ADMIN` | `next-actions-key-admin` | optional |
| `WIZELENS_KEY_ADMIN` | `wizelens-key-admin` | optional |

They were copied from `kv-sparx-prod-cus` with `scripts/copy-secrets-from-sparx.sh`.
`OPERATOR_AUTH_SECRET` and the operator token must stay equal to sparx's: the
first encrypts every operator's authenticator secret, and api-rest checks the
second. Rotate them in both vaults together.
