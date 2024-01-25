import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { VideoEntity } from 'src/entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, VideoEntity])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
