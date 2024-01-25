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
    // const users = await this.authRepository.find({
    //   relations: ['profile', 'videos'],
    //   select: ['createdAt', 'updatedAt', 'id', 'email', 'role'],
    // });
    // const count = await this.authRepository.count();

    const users = await this.authRepository
      .createQueryBuilder('auth')
      .leftJoinAndSelect('auth.profile', 'profileAlias')
      .leftJoinAndSelect('auth.videos', 'videosAlias')
      .select([
        'auth',
        'videosAlias.id',
        'videosAlias.title',
        'videosAlias.description',
        'videosAlias.views',
        'videosAlias.url',
        'profileAlias.id',
        'profileAlias.firstName',
        'profileAlias.lastName',
        'profileAlias.bio',
        'profileAlias.address',
        'profileAlias.phone',
        'profileAlias.job',
        'profileAlias.avatar',
        'profileAlias.role',
      ])
      .getMany();

    const count = await this.authRepository.createQueryBuilder('auth').getCount();

    return { count, users };
  }

  async findUserById(id: number): Promise<AuthEntity> {
    // const user = await this.authRepository.findOne({
    //   where: { id: id },
    //   relations: ['profile', 'videos'],
    //   select: ['createdAt', 'updatedAt', 'id', 'email', 'role'],
    // });

    const user = await this.authRepository
      .createQueryBuilder('auth')
      .where('auth.id = :id', { id: id })
      .leftJoinAndSelect('auth.profile', 'profileAlias')
      .leftJoinAndSelect('auth.videos', 'videosAlias')
      .select([
        'auth',
        'videosAlias.id',
        'videosAlias.title',
        'videosAlias.description',
        'videosAlias.views',
        'videosAlias.url',
        'profileAlias.id',
        'profileAlias.firstName',
        'profileAlias.lastName',
        'profileAlias.bio',
        'profileAlias.address',
        'profileAlias.phone',
        'profileAlias.job',
        'profileAlias.avatar',
        'profileAlias.role',
      ])
      .getOne();

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
    const allUsers = await this.authRepository.find({ select: { id: true, email: true, role: true }, relations: ['profile', 'videos'] });
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
