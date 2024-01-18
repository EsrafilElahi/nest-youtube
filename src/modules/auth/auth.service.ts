import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/AuthEntity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  async findAllUsers(): Promise<AuthEntity[]> {
    return this.authRepository.find();
  }

  async findUserById(id: number): Promise<AuthEntity> {
    const user = await this.authRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async createUser(userDto: CreateUserDto): Promise<AuthEntity[]> {
    if (!userDto) {
      throw new HttpException('user data not found!', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.authRepository.create(userDto);
    await this.authRepository.save(createdUser);
    const allUsers = await this.authRepository.find();
    return allUsers;
  }

  async updateUser(id: number, userDto: CreateUserDto): Promise<AuthEntity> {
    if (!userDto) {
      throw new HttpException('user data not found!', HttpStatus.BAD_REQUEST);
    }

    const userFound = await this.authRepository.findOne({ where: { userId: id } });
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

    const userFound = await this.authRepository.findOne({ where: { userId: id } });
    if (!userFound) {
      throw new HttpException('user not found in database!', HttpStatus.NOT_FOUND);
    }

    const deletedUser = await this.authRepository.delete(id);
    return { message: 'delete user successfully', deletedUser };
  }
}
