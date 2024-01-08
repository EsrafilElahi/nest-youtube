/* eslint-disable prettier/prettier */
// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'mysql',
//         host: String(process.env.MYSQL_HOST),
//         port: Number(process.env.MYSQL_PORT),
//         username: String(process.env.MYSQL_USERNAME),
//         password: String(process.env.MYSQL_PASSWORD),
//         database: String(process.env.MYSQL_DATABASE),
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         synchronize: true,
//       });

//       return dataSource.initialize();
//     },
//   },
// ];

// database.config.ts

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
