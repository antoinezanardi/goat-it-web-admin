FROM node:25.6.1-alpine AS base
LABEL maintainer="Antoine ZANARDI"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI="true"

ARG NUXT_PUBLIC_DEFAULT_LOCALE

RUN npm install -g corepack --force

RUN corepack enable

RUN mkdir -p "$PNPM_HOME" && chown node:node "$PNPM_HOME"

FROM base AS development

RUN apk add --no-cache bash

USER node

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node nuxt.config.ts ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node pnpm-workspace.yaml ./
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node scripts/post-install-prepare.sh ./scripts/post-install-prepare.sh

RUN pnpm install --frozen-lockfile

COPY --chown=node:node app app/

CMD [ "pnpm", "run", "start:dev" ]

FROM base AS build
ENV NODE_ENV=production

USER node

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node pnpm-workspace.yaml ./
COPY --chown=node:node nuxt.config.ts ./
COPY --chown=node:node tsconfig.json ./

COPY --chown=node:node app ./app
RUN find ./app -type f -name '*.spec.ts' -exec rm -f {} +
COPY --chown=node:node modules ./modules
COPY --chown=node:node public ./public

COPY --chown=node:node --from=development /app/node_modules ./node_modules

RUN pnpm run build

RUN pnpm prune --prod --ignore-scripts

FROM base AS production

USER node

ENV NODE_ENV="production"
ENV PORT=3001
ENV HOST=0.0.0.0

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/.output ./.output

EXPOSE 3001

CMD ["pnpm", "start:prod"]
