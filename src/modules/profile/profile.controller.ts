//* NESTJS
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

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

  @Post()
  createProfile(@Body() profileDto: ProfileDto) {
    return this.profileService.createProfile(profileDto);
  }

  @Patch('/:id/edit')
  updateProfile(@Param('id') id: number, @Body() profileDto: ProfileDto) {
    return this.profileService.updateProfile(id, profileDto);
  }

  @Delete('/:id/delete')
  deleteProfile(@Param('id') id: number) {
    return this.profileService.deleteProfile(id);
  }
}
