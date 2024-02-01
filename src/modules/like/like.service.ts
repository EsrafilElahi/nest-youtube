/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { VideoEntity } from 'src/entities/video.entity';
import { Repository } from 'typeorm';
import { LikeEntity } from 'src/entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,

    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,

    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
  ) {}

  async likeOrDislike(userId: number, entityType: string, entityId: number, isLike: boolean) {
    const like = await this.likeRepository.findOne({
      where: { userId, entityType, entityId },
    });

    if (like) {
      // Update existing like
      like.isLike = isLike;
      return this.likeRepository.save(like);
    } else {
      // Create new like
      const newLike = this.likeRepository.create({
        userId,
        entityType,
        entityId,
        isLike,
      });
      return this.likeRepository.save(newLike);
    }
  }
}
