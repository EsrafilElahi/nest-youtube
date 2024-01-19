//* NESTJS
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* SERVICES
import { AuthEntity } from 'src/entities/auth.entity';
import { CreateUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  async findAllUsers() {
    const users = await this.authRepository.find({ relations: ['profile'] });
    const count = await this.authRepository.count();

    return { count, users };
  }

  async findUserById(id: number): Promise<AuthEntity> {
    const user = await this.authRepository.findOne({ where: { id: id }, relations: ['profile'] });
    if (!user) {
      throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async createUser(userDto: Partial<CreateUserDto>) {
    if (!userDto) {
      throw new HttpException('user data not found!', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.authRepository.create(userDto);
    await this.authRepository.save(createdUser);
    const allUsers = await this.authRepository.find({ select: { id: true, email: true, role: true }, relations: ['profile'] });
    const count = await this.authRepository.count();
    return { count, allUsers };
  }

  async updateUser(id: number, userDto: Partial<CreateUserDto>): Promise<AuthEntity> {
    if (!userDto) {
      throw new HttpException('user data not found!', HttpStatus.BAD_REQUEST);
    }

    const userFound = await this.authRepository.findOne({ where: { id: id } });
    if (!userFound) {
      throw new HttpException('user not found in database!', HttpStatus.NOT_FOUND);
    }

    // partial updates with save method
    const upatedUser = await this.authRepository.save(userDto);
    // const upatedUser = await this.authRepository.update(id, userDto);
    return upatedUser;
  }

  async deleteUser(id: number) {
    if (!id) {
      throw new HttpException('user id not found!', HttpStatus.BAD_REQUEST);
    }

    const userFound = await this.authRepository.findOne({ where: { id: id } });
    if (!userFound) {
      throw new HttpException('user not found in database!', HttpStatus.NOT_FOUND);
    }

    await this.authRepository.delete(id);
    return { message: 'delete user successfully', deletedUser: userFound };
  }
}
