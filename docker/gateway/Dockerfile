FROM node:22-alpine AS website-build

WORKDIR /app
COPY website/package.json website/package-lock.json ./
RUN npm ci
COPY website/ ./
ARG VITE_APP_BASE_API=/api
ARG VITE_AMAP_KEY=
ARG VITE_AMAP_SECURITY_JSCODE=
ENV VITE_APP_BASE_API=$VITE_APP_BASE_API \
    VITE_AMAP_KEY=$VITE_AMAP_KEY \
    VITE_AMAP_SECURITY_JSCODE=$VITE_AMAP_SECURITY_JSCODE
RUN npm run build

FROM node:22-alpine AS admin-build

WORKDIR /app
COPY admin/package.json admin/package-lock.json ./
RUN npm ci
COPY admin/ ./
ARG VITE_APP_BASE_API=/api
ARG VITE_ROUTER_BASE=/admin/
ARG VITE_PORTAL_PUBLIC_URL=
ARG VITE_AMAP_KEY=
ARG VITE_AMAP_SECURITY_JSCODE=
ENV VITE_APP_BASE_API=$VITE_APP_BASE_API \
    VITE_ROUTER_BASE=$VITE_ROUTER_BASE \
    VITE_PORTAL_PUBLIC_URL=$VITE_PORTAL_PUBLIC_URL \
    VITE_AMAP_KEY=$VITE_AMAP_KEY \
    VITE_AMAP_SECURITY_JSCODE=$VITE_AMAP_SECURITY_JSCODE
RUN npm run build

FROM nginx:1.27-alpine

COPY docker/nginx/gateway.conf /etc/nginx/conf.d/default.conf
COPY --from=website-build /app/dist /usr/share/nginx/html
COPY --from=admin-build /app/dist /usr/share/nginx/html/admin

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
