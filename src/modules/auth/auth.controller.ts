import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  findAllUsers() {
    return this.authService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: number) {
    return this.authService.findUserById(id);
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.authService.createUser(userDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userDto: CreateUserDto) {
    return this.authService.updateUser(id, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
