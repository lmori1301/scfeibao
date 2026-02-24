import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置静态文件服务
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
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

  // 🔥 关键修改：把默认端口从 3002 改为 3003（你也可以换成其他未被占用的端口，如 3004、6000 等）
  const port = process.env.PORT || 3003;
  await app.listen(port);
  console.log(`应用已启动，运行在：http://localhost:${port}`); // 启动后会输出 http://localhost:3003
  console.log(`API 文档地址：http://localhost:${port}/api-docs`);
}

bootstrap();