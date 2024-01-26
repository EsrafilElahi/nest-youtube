import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { VideoEntity } from 'src/entities/video.entity';
import { AuthEntity } from 'src/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, VideoEntity, AuthEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
