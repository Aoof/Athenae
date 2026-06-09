FROM node:22-alpine AS frontend-build
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-core-fe,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

ARG PUBLIC_HOST=http://localhost
ENV PUBLIC_HOST=${PUBLIC_HOST}

COPY svelte.config.js vite.config.js tsconfig.json ./
COPY src ./src
COPY static ./static
RUN pnpm run build

ENV NODE_ENV=production
EXPOSE 8032
