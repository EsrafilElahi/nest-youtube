/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: String(process.env.MYSQL_HOST),
        port: Number(process.env.MYSQL_PORT),
        username: String(process.env.MYSQL_USERNAME),
        password: String(process.env.MYSQL_PASSWORD),
        database: String(process.env.MYSQL_DATABASE),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
