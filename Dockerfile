# Build context = repo root:
#   docker build -t besa-agency-site .
FROM node:24-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH CI=true
RUN corepack enable
WORKDIR /app

FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# pnpm applies patches/ during install (Keystatic's admin route moved to /admin).
COPY patches ./patches
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .
ARG PUBLIC_SITE_URL=https://besaweb.com
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
# Slug of the GitHub App behind the /keystatic login (public, baked into the admin bundle).
ARG PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
ENV PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=$PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
# Edits from the admin panel land on main without a local test run: the tests (no amounts in
# validation copy, no [TODO], valid switches) gate the build, so a bad edit fails here and Coolify
# keeps the previous container online.
RUN pnpm test && pnpm build

# Production dependencies only, for the runtime stage
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod

FROM node:24-slim AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
WORKDIR /app
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/server.mjs ./server.mjs
COPY --from=build --chown=node:node /app/src/lib/features.ts ./src/lib/features.ts
COPY --from=build --chown=node:node /app/src/data/site/switches.json ./src/data/site/switches.json
USER node
EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.mjs"]
