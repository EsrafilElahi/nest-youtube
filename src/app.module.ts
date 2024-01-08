import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './database/database';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, DatabaseController],
  providers: [AppService, Database],
})
export class AppModule {}
