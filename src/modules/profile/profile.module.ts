import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { AuthEntity } from 'src/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, AuthEntity])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
