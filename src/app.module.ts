/* eslint-disable prettier/prettier */
//* NESTJS
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  providers: [AppService],
})
export class AppModule {}
