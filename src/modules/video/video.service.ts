/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { VideoEntity } from 'src/entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,

    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async createVideo(createVideoDto: CreateVideoDto) {
    const { userId, ...otherData } = createVideoDto;

    // conditions
    if (!createVideoDto) {
      throw new HttpException('video data not found!', HttpStatus.BAD_REQUEST);
    }
    const userFound = await this.authRepository.findOne({ where: { id: Number(userId) }, select: { id: true, email: true, role: true } });
    if (!userFound) {
      throw new HttpException('user not found!', HttpStatus.BAD_REQUEST);
    }

    // Create a video entity and associate it with the user
    const createdVideo = await this.videoRepository.create({  
      ...otherData,
      auth: userFound, // Set the auth property to associate the video with the user
    });

    await this.videoRepository.save(createdVideo);

    return createdVideo;
  }

  async findAllVideos() {
    return `This action returns all video`;
  }

  async findOneVideo(id: number) {
    return `This action returns a #${id} video`;
  }

  async updateVideo(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  async deleteVideo(id: number) {
    return `This action removes a #${id} video`;
  }
}
