# Build context = monorepo root:
#   docker build -f apps/agency-site/Dockerfile -t besa-agency-site .
FROM node:24-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH CI=true
RUN corepack enable
WORKDIR /repo

FROM base AS build
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/agency-site/package.json apps/agency-site/
COPY packages ./packages
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter "@besa/agency-site..."
COPY apps/agency-site apps/agency-site
ARG PUBLIC_SITE_URL=https://besaweb.com
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
RUN pnpm --filter "@besa/agency-site..." build
# Self-contained production tree (prod deps only) for the runtime stage
RUN pnpm --filter @besa/agency-site deploy --legacy --prod /out \
    && cp -r apps/agency-site/dist /out/dist \
    && cp apps/agency-site/server.mjs /out/server.mjs

FROM node:24-slim AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
WORKDIR /app/apps/agency-site
COPY --from=build --chown=node:node /out ./
USER node
EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.mjs"]
