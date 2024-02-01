import { Module } from '@nestjs/common';
import { VideoService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { VideoEntity } from 'src/entities/video.entity';
import { CommentEntity } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, VideoEntity, CommentEntity])],
  controllers: [LikeController],
  providers: [VideoService],
})
export class LikeModule {}
