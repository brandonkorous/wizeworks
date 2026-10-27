# syntax=docker/dockerfile:1.7
#
# The WizeWorks marketing site — a Next.js app living in `site/` of a repo whose
# root also holds the brand specs and the concept mockups.
#
# BUILD CONTEXT IS THE REPO ROOT, not `site/`:
#   docker build -f site/Dockerfile .
# The root `.dockerignore` keeps the docs and mockups out, and admin/Dockerfile
# uses the same context, so both apps share one ignore file.
#
# WHY STANDALONE. `next build` with `output: "standalone"` traces the modules
# actually reached at runtime and emits a self-contained server — 23 MB here,
# against roughly 500 MB for a naive `COPY . .` of node_modules. That is not
# tidiness: this image runs on `aks-sparx-prod-cus`, a SINGLE node with a 110 GB
# ephemeral disk, and a rolling update holds two generations at once. sparx put
# that node into DiskPressure on 2026-08-02 with fat images and the whole worker
# fleet sat in ImagePullBackOff. A small image is a reliability property here.

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# pnpm globally rather than via corepack: corepack prepares its cache for the
# user that ran it, so a root-prepared cache is unreadable by a non-root runtime
# user. /usr/local is readable by everyone. (Same reasoning as sparx's
# Dockerfile.base, which learned it the hard way.)
RUN npm install --global pnpm@10.9.0

# Lockfile first so a content change does not invalidate the install layer.
COPY site/package.json site/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

ARG WIZELENS_RELEASE
ENV WIZELENS_RELEASE=$WIZELENS_RELEASE
COPY site/ ./
RUN pnpm build

# ---------- runtime ----------
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# sharp is a native module and Next 15 removed the WASM fallback, so production
# image optimisation needs it. On Alpine its prebuilt binary wants gcompat.
RUN apk add --no-cache libc6-compat

# The standalone bundle carries its own minimal node_modules and server.js.
# `static` and `public` are NOT included by the trace and must be copied
# alongside it, at the paths the server expects.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

ARG WIZELENS_RELEASE
ENV WIZELENS_RELEASE=$WIZELENS_RELEASE

USER node
EXPOSE 3000

# No shell form: this way node is PID 1 and receives SIGTERM directly, so the
# preStop drain in the Deployment actually reaches it.
CMD ["node", "server.js"]
