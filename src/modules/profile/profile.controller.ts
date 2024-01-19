//* NESTJS
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

//* SERVICES
import { ProfileService } from './profile.service';
import { ProfileDto } from './profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getProfiles() {
    return this.profileService.getProfiles();
  }

  @Get(':id')
  getProfileById(@Param('id') id: number) {
    return this.profileService.getProfileById(id);
  }

  @Post(':id')
  createProfile(@Param('id') id: number, @Body() profileDto: Partial<ProfileDto>) {
    return this.profileService.createProfile(id, profileDto);
  }

  @Patch('/:id/edit')
  updateProfile(@Param('id') id: number, @Body() profileDto: Partial<ProfileDto>) {
    return this.profileService.updateProfile(id, profileDto);
  }

  @Delete('/:id/delete')
  deleteProfile(@Param('id') id: number) {
    return this.profileService.deleteProfile(id);
  }
}
