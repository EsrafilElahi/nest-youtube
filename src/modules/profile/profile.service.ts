import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './profile.dto';
import { AuthEntity } from 'src/entities/auth.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,

    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  async getProfiles() {
    const profiles = await this.profileRepository.find({ relations: ['auth'] });

    const count = await this.profileRepository.count();
    return { count, profiles };
  }

  async getProfileById(id: number) {
    const foundProfile = await this.profileRepository.findOne({ where: { id: id }, relations: ['auth'] });

    if (!foundProfile) {
      throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    }

    return foundProfile;
  }

  async createProfileById(userId: number, profileDto: Partial<ProfileDto>) {
    if (!profileDto || !userId) {
      throw new HttpException('user data or id not found!', HttpStatus.BAD_REQUEST);
    }

    const createProfile = this.profileRepository.create(profileDto);

    // handle one-to-one relation
    const userRelated = await this.authRepository.findOne({ where: { id: userId }, select: { id: true, email: true, role: true } });
    if (!userRelated) {
      throw new HttpException('profile-user not found!', HttpStatus.NOT_FOUND);
    }

    createProfile.auth = userRelated;

    return await this.profileRepository.save(createProfile);
  }

  async updateProfileById(profileId: number, profileDto: Partial<ProfileDto>) {
    if (!profileDto) {
      throw new HttpException('profile data not found!', HttpStatus.BAD_REQUEST);
    }

    const profileFound = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['auth'] });

    if (!profileFound) {
      throw new HttpException('profile not found!', HttpStatus.NOT_FOUND);
    }

    this.profileRepository.merge(profileFound, profileDto);

    const upatedProfile = await this.profileRepository.save(profileFound);
    return upatedProfile;
  }

  async deleteProfileById(profileId: number) {
    if (!profileId) {
      throw new HttpException('profile id not found!', HttpStatus.BAD_REQUEST);
    }

    const profileFound = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['auth'] });
    if (!profileFound) {
      throw new HttpException('profile not found in database!', HttpStatus.NOT_FOUND);
    }

    await this.profileRepository.delete(profileId);
    return { message: 'delete profile successfully', deletedProfile: profileFound };
  }
}
