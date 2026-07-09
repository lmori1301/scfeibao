import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import { basename, dirname, extname, join, normalize } from 'path';
import { Request, Response } from 'express';
import * as https from 'https';

const port = process.env.PORT || 3003;
const AMAP_PROXY_PREFIX = '/_AMapService';
const AMAP_SECURITY_JSCODE =
  process.env.AMAP_SECURITY_JSCODE || '89a3e2583feec1c50c910b5e8518451e';

function isAmapStyleRequest(pathname: string) {
  return pathname.startsWith(`${AMAP_PROXY_PREFIX}/v4/map/styles`);
}

function buildAmapUpstreamUrl(originalUrl: string) {
  const requestUrl = new URL(originalUrl, 'http://127.0.0.1');
  const pathname = requestUrl.pathname.replace(
    new RegExp(`^${AMAP_PROXY_PREFIX}`),
    '',
  );
  const upstreamHost = isAmapStyleRequest(requestUrl.pathname)
    ? 'webapi.amap.com'
    : 'restapi.amap.com';

  requestUrl.pathname = pathname || '/';
  requestUrl.searchParams.set('jscode', AMAP_SECURITY_JSCODE);

  return new URL(`${requestUrl.pathname}${requestUrl.search}`, `https://${upstreamHost}`);
}

function getOptimizedUploadPath(requestPath: string, uploadRoot: string) {
  if (!/^\/images\/.+\.(png|jpe?g)$/i.test(requestPath)) return '';

  const relativePath = decodeURIComponent(requestPath).replace(/^\/images\//, 'images/');
  const originalPath = normalize(join(uploadRoot, relativePath));
  const imagesRoot = normalize(join(uploadRoot, 'images'));

  if (!originalPath.startsWith(`${imagesRoot}/`) && originalPath !== imagesRoot) return '';

  return join(
    dirname(originalPath),
    `${basename(originalPath, extname(originalPath))}.webp`,
  );
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const uploadRoot = join(__dirname, '..', 'uploads');

  app.use(AMAP_PROXY_PREFIX, (req: Request, res: Response) => {
    const upstreamUrl = buildAmapUpstreamUrl(req.originalUrl || req.url);
    const proxyRequest = https.request(
      upstreamUrl,
      {
        method: req.method,
        headers: {
          ...req.headers,
          host: upstreamUrl.host,
        },
      },
      (proxyResponse) => {
        const { statusCode = 502, headers } = proxyResponse;
        Object.entries(headers).forEach(([key, value]) => {
          if (value === undefined) return;
          res.setHeader(key, value as string | string[]);
        });
        res.status(statusCode);
        proxyResponse.pipe(res);
      },
    );

    proxyRequest.on('error', (error) => {
      if (!res.headersSent) {
        res.status(502).json({
          message: '高德地图代理请求失败',
          detail: error.message,
        });
      } else {
        res.end();
      }
    });

    req.pipe(proxyRequest);
  });

  app.use('/uploads', (req: Request, res: Response, next) => {
    const acceptsWebp = String(req.headers.accept || '').includes('image/webp');
    if (!acceptsWebp) {
      next();
      return;
    }

    const optimizedPath = getOptimizedUploadPath(req.path, uploadRoot);
    if (!optimizedPath || !existsSync(optimizedPath)) {
      next();
      return;
    }

    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Vary', 'Accept');
    res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    res.sendFile(optimizedPath);
  });

  // 配置静态文件服务
  app.useStaticAssets(uploadRoot, {
    prefix: '/uploads',
    maxAge: '30d',
    immutable: true,
  });

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS 配置
  app.enableCors({
    origin: process.env.NODE_ENV === 'development' ? true : (process.env.CORS_ORIGIN || 'http://localhost:5173'),
    credentials: true,
  });

  // API 前缀
  const apiPrefix = process.env.API_PREFIX || 'api';
  app.setGlobalPrefix(apiPrefix);

  // Swagger 文档配置
  const config = new DocumentBuilder()
    .setTitle('四川飞豹救援 API')
    .setDescription('四川飞豹救援官网后端接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
  console.log(`应用已启动，运行在：http://localhost:${port}`);
  console.log(`API 文档地址：http://localhost:${port}/api-docs`);
}

bootstrap();
