# Build stage
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm build

# Production stage
FROM node:24-alpine AS production

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile --ignore-scripts

COPY --from=build /app/dist ./dist

EXPOSE 4173

CMD ["pnpm", "preview", "--host"]