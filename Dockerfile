FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm rebuild @tailwindcss/oxide sharp unrs-resolver

COPY public ./public
COPY src ./src
COPY next.config.ts ./
COPY postcss.config.mjs ./
COPY tsconfig.json ./

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]