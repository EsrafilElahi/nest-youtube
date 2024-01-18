/* eslint-disable prettier/prettier */
//* NESTJS
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

//* SERVICES
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'], // Adjust for different environments
    }),
    DatabaseModule,
  ],
  controllers: [AppController],

  // how about jwt guard
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      // useClass: ClassSerializerInterceptor,
      useClass: UserInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

// ==================== UserInterceptor ====================
// //* NESTJS
// import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

// //* LIBRARY
// import * as JWT from 'jsonwebtoken';

// export class UserInterceptor implements NestInterceptor {
//   async intercept(context: ExecutionContext, next: CallHandler) {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization.split('Bearer ')[1];
//     const user = await JWT.decode(token);

//     request.user = user;
//     return next.handle();
//   }
// }

// ==================== AuthGuard ====================
// //* NESTJS
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// //* LIBRARY
// import * as JWT from 'jsonwebtoken';
// import { PrismaService } from 'src/prisma/prisma.service';

// interface JWTPayload {
//   name: string;
//   id: number;
//   iat: number;
//   exp: number;
// }

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,
//     private readonly prismaService: PrismaService,
//   ) {}

//   async canActivate(context: ExecutionContext) {
//     const roles = this.reflector.getAllAndOverride('roles', [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (roles?.length) {
//       const request = context.switchToHttp().getRequest();
//       const token = request.headers.authorization.split('Bearer ')[1];
//       try {
//         const payload = (await JWT.verify(
//           token,
//           process.env.JSON_TOKEN_KEY,
//         )) as JWTPayload;

//         const user = await this.prismaService.user.findUnique({
//           where: {
//             id: payload.id,
//           },
//         });

//         if (!user) return false;

//         if (roles.includes(user.user_type)) return true;

//         return false;
//       } catch (error) {
//         return false;
//       }
//     }

//     return true;
//   }
// }
