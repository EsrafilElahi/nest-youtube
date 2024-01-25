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
  createProfileById(@Param('id') id: number, @Body() profileDto: Partial<ProfileDto>) {
    return this.profileService.createProfileById(id, profileDto);
  }

  @Patch('/:id/edit')
  updateProfileById(@Param('id') id: number, @Body() profileDto: Partial<ProfileDto>) {
    return this.profileService.updateProfileById(id, profileDto);
  }

  @Delete('/:id/delete')
  deleteProfileById(@Param('id') id: number) {
    return this.profileService.deleteProfileById(id);
  }
}
