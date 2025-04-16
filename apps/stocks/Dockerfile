FROM node:lts-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /usr/src/app
COPY dist/apps/stocks/package*.json ./

RUN npm install --omit=dev --ignore-scripts

# Production image, copy all the files and run nest
FROM base AS runner
RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json

RUN mkdir -p /app/logs

COPY dist/apps/stocks .

EXPOSE 3001
CMD ["dumb-init", "node", "main.js"]
