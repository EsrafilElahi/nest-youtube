import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':userId/:entityType/:entityId/like') // userId as part of the URL
  async like(
    @Param('userId') userId: number, // Extract userId from URL parameter
    @Body('isLike') isLike: boolean, // Extract isLike from request body
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: number,
  ): Promise<string> {
    await this.likeService.likeOrDislike(userId, entityType, entityId, isLike);
    return 'Liked successfully';
  }

  @Post(':entityType/:entityId/dislike')
  async dislike(@Param('entityType') entityType: string, @Param('entityId') entityId: number): Promise<string> {
    await this.likeService.likeOrDislike(1, entityType, entityId, false);
    return 'Disliked successfully';
  }
}
