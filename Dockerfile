FROM node:25.7.0-alpine AS base
LABEL maintainer="Antoine ZANARDI"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI="true"

RUN npm install -g corepack --force

RUN corepack enable

RUN mkdir -p "$PNPM_HOME" && chown node:node "$PNPM_HOME"

FROM --platform=$BUILDPLATFORM base AS development

RUN apk add --no-cache bash

USER node

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node envs ./
COPY --chown=node:node nuxt.config.ts ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node pnpm-workspace.yaml ./
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node scripts/post-install-prepare.sh ./scripts/post-install-prepare.sh

RUN pnpm install --frozen-lockfile

COPY --chown=node:node app app/

CMD [ "pnpm", "run", "start:dev" ]

FROM --platform=$BUILDPLATFORM base AS build
ENV NODE_ENV=production

USER node

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node pnpm-workspace.yaml ./
COPY --chown=node:node nuxt.config.ts ./
COPY --chown=node:node tsconfig.json ./

COPY --chown=node:node app ./app
COPY --chown=node:node modules ./modules
COPY --chown=node:node public ./public

COPY --chown=node:node --from=development /app/node_modules ./node_modules

RUN pnpm run build

FROM base AS production

USER node

ARG NUXT_PUBLIC_DEFAULT_LOCALE
ENV NUXT_PUBLIC_DEFAULT_LOCALE=${NUXT_PUBLIC_DEFAULT_LOCALE}

ENV NODE_ENV="production"
ENV PORT=3001
ENV HOST=0.0.0.0

WORKDIR /app

COPY --from=build --chown=node:node /app/.output ./.output

EXPOSE 3001

HEALTHCHECK --interval=20s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001 || exit 1

CMD ["node", ".output/server/index.mjs"]
