import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  createVideo(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.createVideo(createVideoDto);
  }

  @Get()
  findAllVideos() {
    return this.videoService.findAllVideos();
  }

  @Get(':id')
  findOneVideo(@Param('id') id: number) {
    return this.videoService.findOneVideo(id);
  }

  @Patch(':id')
  updateVideo(@Param('id') id: number, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.updateVideo(id, updateVideoDto);
  }

  @Delete(':id')
  deleteVideo(@Param('id') id: number) {
    return this.videoService.deleteVideo(id);
  }
}
