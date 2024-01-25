import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/auth.entity';
import { ProfileEntity } from 'src/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, ProfileEntity])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
