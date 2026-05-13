# Build stage
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm build

# Production stage - copy built files, no CMD (volume persists them)
FROM node:24-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist