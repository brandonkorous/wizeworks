# syntax=docker/dockerfile:1.7
#
# The WizeWorks operator console (admin.wize.works) — a Next.js standalone server
# on port 3000.
#
# BUILD CONTEXT IS THE REPO ROOT, like site/Dockerfile, so the root .dockerignore
# keeps the docs and mockups out:
#   docker build -f admin/Dockerfile .
#
# admin/ is its own pnpm workspace: the app at its root plus the packages it was
# built on under admin/packages. The console holds no database access of its own
# beyond the wize_admin schema (operator-auth's pg pool); everything else it
# reads through sparx api-rest's /internal/operator/* routes.

ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS base
RUN apk add --no-cache libc6-compat openssl
# pnpm globally rather than via corepack, for the reason in site/Dockerfile: a
# root-prepared corepack cache is unreadable by the non-root runtime user.
RUN npm install --global pnpm@10.9.0
WORKDIR /repo

# ----- Install + build -----
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1

# Workspace metadata first, so a source change does not invalidate the install.
COPY admin/package.json admin/pnpm-lock.yaml admin/pnpm-workspace.yaml admin/.npmrc admin/tsconfig.base.json ./
COPY admin/packages/app-kit/package.json packages/app-kit/
COPY admin/packages/brand/package.json packages/brand/
COPY admin/packages/brand-core/package.json packages/brand-core/
COPY admin/packages/events/package.json packages/events/
COPY admin/packages/forms/package.json packages/forms/
COPY admin/packages/operator/package.json packages/operator/
COPY admin/packages/operator-auth/package.json packages/operator-auth/
COPY admin/packages/silica-corrections/package.json packages/silica-corrections/
COPY admin/packages/ui/package.json packages/ui/

RUN --mount=type=cache,id=pnpm-admin,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY admin/ ./

# Stamp the release version into the client bundle (NEXT_PUBLIC_* is inlined at
# build time). Declared right before the build so a version bump never busts the
# cached dependency/source layers above it.
ARG APP_VERSION=dev
ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION

# Stable server-action ids across builds (SI-2). No secret = Next picks a random key.
RUN --mount=type=secret,id=next_actions_key \
    key="$(cat /run/secrets/next_actions_key 2>/dev/null || true)"; \
    if [ -n "$key" ]; then export NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$key"; fi; \
    pnpm build

# ----- Production runner -----
FROM node:${NODE_VERSION} AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

ARG APP_VERSION=dev
ENV APP_VERSION=$APP_VERSION

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs

# The standalone bundle carries its own minimal node_modules and server.js;
# `static` is not traced and goes alongside it.
COPY --from=builder --chown=nextjs:nodejs /repo/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# The commit this image was built from; WizeLens reports it as the release.
ARG WIZELENS_RELEASE=local
ENV WIZELENS_RELEASE=$WIZELENS_RELEASE

# No shell form: node is PID 1 and receives SIGTERM directly, so the preStop
# drain in the Deployment reaches it.
CMD ["node", "server.js"]
