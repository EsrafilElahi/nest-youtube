import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { VideoEntity } from 'src/entities/video.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { LikeEntity } from 'src/entities/like.entity';
import { DisLikeEntity } from 'src/entities/disLike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, VideoEntity, CommentEntity, LikeEntity, DisLikeEntity])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
