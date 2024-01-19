import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async getProfiles() {
    const profiles = await this.profileRepository.find({ relations: { auth: true } });

    const count = await this.profileRepository.count();

    if (profiles) {
      throw new HttpException('profiles not found!', HttpStatus.NOT_FOUND);
    }

    return { count, profiles };
  }

  async getProfileById(id: number) {
    const foundProfile = await this.profileRepository.findOne({ where: { id: id }, relations: { auth: true } });

    if (!foundProfile) {
      throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    }

    return foundProfile;
  }

  async createProfile(profileDto: Partial<ProfileDto>) {
    if (!profileDto) {
      throw new HttpException('user data not found!', HttpStatus.BAD_REQUEST);
    }

    const createProfile = this.profileRepository.create(profileDto);
    return await this.profileRepository.save(createProfile);
  }

  async updateProfile(profileId: number, profileDto: Partial<ProfileDto>) {
    if (!profileDto) {
      throw new HttpException('profile data not found!', HttpStatus.BAD_REQUEST);
    }

    const profileFound = await this.profileRepository.findOne({ where: { id: profileId } });

    if (!profileFound) {
      throw new HttpException('profile not found!', HttpStatus.NOT_FOUND);
    }

    // partial updates with save method
    const upatedProfile = await this.profileRepository.save(profileDto);
    // const upatedProfile = await this.authRepository.update(id, userDto);
    return upatedProfile;
  }

  async deleteProfile(profileId: number) {
    if (!profileId) {
      throw new HttpException('profile id not found!', HttpStatus.BAD_REQUEST);
    }

    const profileFound = await this.profileRepository.findOne({ where: { id: profileId } });
    if (!profileFound) {
      throw new HttpException('profile not found in database!', HttpStatus.NOT_FOUND);
    }

    await this.profileRepository.delete(profileId);
    return { message: 'delete profile successfully', deletedProfile: profileFound };
  }
}
