import { Global, Module } from '@nestjs/common';
import { databaseConfig } from './database.providers';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// t indicates that the module and its provided services will be instantiated only once and shared globally across the entire application. This can be useful when you want to create singleton services that should be reused throughout the entire application
// when this module is imported into other modules, the services and components it provides will be shared across the entire application. if we don't put this @Global(), in another modules must be imported manually in import[]
@Global() // make global, not need import
@Module({
  imports: [
    // for all pages applied
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServer: ConfigService) => databaseConfig(configServer),
    }),
  ],
})
export class DatabaseModule {}
