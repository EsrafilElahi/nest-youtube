/* eslint-disable prettier/prettier */
//* NESTJS
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

//* LIBRARY
import * as cookieParser from 'cookie-parser';

//* SERVICEs
import { AppModule } from './app.module';

// * ---> if you use the service => import it in providers[]
// * ---> if you use the module => import it in imports[]

// use this to hanlde errors

// throw new HttpException(
//   'An account with that email already exists!',
//   HttpStatus.CONFLICT,
// );

// exports: [UserService], ---> must be export to use it into other modules directly
// or put UserService to Providers array where you want use

// every module like products ---> TypeOrmModule.forFeature([Product, BoughtProducts]),
// try this too ---> entities: [User, Product, UserLikes, BoughtProducts],

// ___ custom decorator ___ ---> for get userId doesn't need to pass userId from frontend
// import { ExecutionContext } from "@nestjs/common";
// import { createParamDecorator } from "@nestjs/common/decorators"
// import { User } from "src/database/entities/user/user.entity"

// export const ExtractUser = createParamDecorator((data, ctx: ExecutionContext) : User => {
//     const req = ctx.switchToHttp().getRequest();
//     return req.user;
// });

// custom exception
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from '@prisma/client';

// @Injectable()
// export class UserException {
//   public userNotFound(user: User) {
//     if (!user) {
//       throw new NotFoundException('유저를 찾을 수 없습니다.');
//     }
//   }
// }

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

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true, // convert data automatically
    }),
  );

  await app.listen(PORT);
}
bootstrap();
