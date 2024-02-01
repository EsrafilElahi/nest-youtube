import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateVideoDto } from './dto/create-like.dto';
import { UpdateVideoDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  createVideo(@Body() createVideoDto: CreateVideoDto) {
    return this.likeService.createVideo(createVideoDto);
  }

  @Get()
  findAllVideos() {
    return this.likeService.findAllVideos();
  }

  @Get(':id')
  findOneVideo(@Param('id') id: number) {
    return this.likeService.findOneVideo(id);
  }

  @Patch('/:id/edit')
  updateVideo(@Param('id') id: number, @Body() updateVideoDto: UpdateVideoDto) {
    return this.likeService.updateVideo(id, updateVideoDto);
  }

  @Delete('/:id/delete')
  deleteVideo(@Param('id') id: number) {
    return this.likeService.deleteVideo(id);
  }
}
