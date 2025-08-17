FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install && pnpm approve-builds

COPY public ./public
COPY src ./src
COPY eslint.config.mjs ./
COPY next-env.d.ts ./
COPY next.config.ts ./
COPY postcss.config.mjs ./
COPY tsconfig.json ./

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]