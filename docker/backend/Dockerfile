FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

COPY --from=build --chown=node:node /app/package.json /app/package-lock.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/create-admin.js ./create-admin.js
COPY --from=build --chown=node:node /app/scripts/create-admin-config.js ./scripts/create-admin-config.js
RUN mkdir -p uploads && chown node:node uploads

USER node
EXPOSE 3003

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD node -e "const net=require('net');const socket=net.connect(3003,'127.0.0.1',()=>{socket.end();process.exit(0)});socket.setTimeout(3000);socket.on('error',()=>process.exit(1));socket.on('timeout',()=>process.exit(1))"

CMD ["node", "dist/main"]
