/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { databaseConfig } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global() // make global, not need import
@Module({
  imports: [
    ConfigModule.forRoot(),
    // for all pages applied
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServer: ConfigService) => databaseConfig(configServer),
    }),
  ],
})
export class DatabaseModule {}
