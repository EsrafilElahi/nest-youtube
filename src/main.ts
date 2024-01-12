/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

// use this to hanlde errors

// throw new HttpException(
//   'An account with that email already exists!',
//   HttpStatus.CONFLICT,
// );

// exports: [UserService], ---> must be export to use it into other modules directly


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const FRONTEND_URL = configService.get<string>('FRONTEND_URL');
  const PORT = configService.get<number>('PORT');

  app.use(cookieParser());

  app.setGlobalPrefix('api');
  // app.select(DatabaseModule).init();

  app.enableCors({
    origin: FRONTEND_URL,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
  });

  await app.listen(PORT);
}
bootstrap();
