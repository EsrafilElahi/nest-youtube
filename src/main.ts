//* NESTJS
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

//* LIBRARY
import * as cookieParser from 'cookie-parser';

//* SERVICES
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const FRONTEND_URL = configService.get<string>('FRONTEND_URL');
  const PORT = configService.get<number>('PORT');

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: FRONTEND_URL,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, PUT, POST, PATCH, DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true, // convert data automatically
    }),
  );

  await app.listen(PORT);
}
bootstrap();
