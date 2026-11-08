# syntax=docker/dockerfile:1

# ====================================================================================
# Stage 1: build (pnpm install -> vite build -> self-contained dist/standalone)
# ====================================================================================
FROM node:24-alpine AS build

WORKDIR /build

# The lockfile must be present before install so pnpm resolves the frozen graph.
COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

# next.config.ts sets output: "standalone", so the build produces
# dist/standalone/ — a self-contained server.js with its own trimmed
# node_modules, dist assets, and public files.
# `exec` bypasses the package.json lifecycle, so image builds only bundle;
# format/lint/typecheck belong to CI/dev.
RUN pnpm exec vite build

# ====================================================================================
# Stage 2: runtime (standalone server.js, no dev dependencies)
# ====================================================================================
FROM node:24-alpine AS runtime

ENV NODE_ENV=production
# vinext's standalone server binds 0.0.0.0 and listens on PORT (default 3000).
ENV PORT=3000

WORKDIR /app

COPY --from=build /build/dist/standalone ./

USER node

EXPOSE 3000

CMD ["node", "server.js"]
