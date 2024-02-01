import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  createLike(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.createLike(createLikeDto);
  }

  @Get()
  findAllUserLikes(@Body() userId: string) {
    return this.likeService.findAllUserLikes(userId);
  }

  @Patch('/:id/edit')
  updateVideo(@Param('id') id: number, @Body() updateVideoDto: UpdateLikeDto) {
    return this.likeService.updateVideo(id, updateVideoDto);
  }

  @Delete('/:id/delete')
  deleteVideo(@Param('id') id: number) {
    return this.likeService.deleteVideo(id);
  }
}
