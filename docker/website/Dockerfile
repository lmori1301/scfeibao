FROM node:22-alpine AS build

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

FROM nginx:1.27-alpine

COPY docker/nginx/website.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
