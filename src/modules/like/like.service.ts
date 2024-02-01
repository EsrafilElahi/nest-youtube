/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { VideoEntity } from 'src/entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,

    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async createVideo(createVideoDto: CreateLikeDto) {
    const { userId, ...otherData } = createVideoDto;

    // conditions
    if (!createVideoDto) {
      throw new HttpException('video data not found!', HttpStatus.BAD_REQUEST);
    }
    const userFound = await this.authRepository.findOne({ where: { id: Number(userId) }, select: { id: true, email: true, role: true } });
    if (!userFound) {
      throw new HttpException('user not found in database', HttpStatus.BAD_REQUEST);
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
    // const foundVideos = await this.videoRepository.find({
    //   relations: ['auth'],
    // });

    const foundVideos = await this.videoRepository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.auth', 'authAlias') // 'auth' is the name of the relation in VideoEntity
      .select(['video', 'authAlias.id', 'authAlias.email', 'authAlias.role']) // Select specific properties
      .getMany();

    if (!foundVideos) {
      throw new HttpException('videos not found in database', HttpStatus.NOT_FOUND);
    }

    const count = await this.videoRepository.count();
    return { count, videos: foundVideos };
  }

  async findOneVideo(videoId: number) {
    if (!videoId) {
      throw new HttpException('video id not found in database', HttpStatus.BAD_REQUEST);
    }

    // const foundVideo = await this.videoRepository.findOne({ where: { id: videoId }, relations: ['auth'] });
    const foundVideo = await this.videoRepository
      .createQueryBuilder('video')
      .where('video.id = :videoId', { videoId: videoId })
      .leftJoinAndSelect('video.auth', 'authAlias')
      .select(['video', 'authAlias.id', 'authAlias.email', 'authAlias.role']) // Select specific properties
      .getOne();

    if (!foundVideo) {
      throw new HttpException('video not found in database', HttpStatus.NOT_FOUND);
    }

    return foundVideo;
  }

  async updateVideo(videoId: number, updateVideoDto: UpdateLikeDto) {
    const foundVideo = await this.videoRepository.findOne({ where: { id: videoId }, relations: ['auth'] });

    if (!foundVideo) {
      throw new HttpException('video not found in database', HttpStatus.NOT_FOUND);
    }

    const videoUpdation = await this.videoRepository.createQueryBuilder().update(VideoEntity).set(updateVideoDto).where('id = :videoId', { videoId }).execute();

    // Merge the video data with the provided DTO
    // this.videoRepository.merge(foundVideo, updateVideoDto);

    // // Save the updated video entity
    // const updatedVideo = await this.videoRepository.save(foundVideo);

    const updatedVideo = await this.videoRepository.find({ where: { id: videoId }, relations: ['auth'] });

    if (videoUpdation?.affected === 1) {
      return updatedVideo;
    }

    throw new HttpException('video not found in database', HttpStatus.NOT_FOUND);
  }

  async deleteVideo(videoId: number) {
    if (!videoId) {
      throw new HttpException('video id not found!', HttpStatus.BAD_REQUEST);
    }

    const videoFound = await this.videoRepository.findOne({ where: { id: videoId }, relations: ['auth'] });
    if (!videoFound) {
      throw new HttpException('video not found in database!', HttpStatus.NOT_FOUND);
    }

    await this.videoRepository.delete(videoId);
    return { message: 'delete video successfully', deletedVideo: videoFound };
  }
}
