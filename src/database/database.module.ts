/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { databaseConfig } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ // for all pages applied
      // inject: [databaseConfig], ----> test this, work? or not?
      useFactory: (configServer: ConfigService) => databaseConfig(configServer),
    }),
  ],
})
export class DatabaseModule {}
