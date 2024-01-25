/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  createVideo(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  findAllVideos() {
    return `This action returns all video`;
  }

  findOneVideo(id: number) {
    return `This action returns a #${id} video`;
  }

  updateVideo(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  deleteVideo(id: number) {
    return `This action removes a #${id} video`;
  }
}
