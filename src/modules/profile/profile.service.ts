import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async getProfile(id: number) {
    const foundProfile = await this.profileRepository.findOne({ where: { id: id }, relations: { auth: true } });

    if (!foundProfile) {
      throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    }

    return foundProfile;
  }

  async createProfile(profileData: Partial<ProfileEntity>) {
    const profile = this.profileRepository.create(profileData);
    return await this.profileRepository.save(profile);
  }

  async updateProfile(profileId: number, profileData: Partial<ProfileEntity>) {
    await this.profileRepository.update(profileId, profileData);
    return this.profileRepository.findOne(profileId);
  }

  async editProfile(profileId: number, profileData: Partial<ProfileEntity>) {
    return this.updateProfile(profileId, profileData);
  }

  async deleteProfile(profileId: number): Promise<void> {
    await this.profileRepository.delete(profileId);
  }

  async getProfiles(): Promise<ProfileEntity[]> {
    return this.profileRepository.find();
  }
}
