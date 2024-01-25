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
      throw new HttpException('User data or ID not found!', HttpStatus.BAD_REQUEST);
    }

    const user = await this.authRepository.findOne({ where: { id: userId }, select: { id: true, email: true, role: true } });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    // Create a profile entity and associate it with the user
    const createdProfile = this.profileRepository.create({
      ...profileDto,
      auth: user, // Set the auth property to associate the profile with the user
    });

    // Save the profile entity
    await this.profileRepository.save(createdProfile);

    // Return the created profile entity
    return createdProfile;
  }

  async updateProfileById(profileId: number, profileDto: Partial<ProfileDto>) {
    if (!profileDto) {
      throw new HttpException('Profile data not found!', HttpStatus.BAD_REQUEST);
    }

    // Find the profile by ID with the associated user (auth)
    const profileFound = await this.profileRepository.findOne({ where: { id: profileId }, relations: ['auth'] });

    if (!profileFound) {
      throw new HttpException('Profile not found!', HttpStatus.NOT_FOUND);
    }

    // Merge the profile data with the provided DTO
    this.profileRepository.merge(profileFound, profileDto);

    // Save the updated profile entity
    const updatedProfile = await this.profileRepository.save(profileFound);

    return updatedProfile;
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
