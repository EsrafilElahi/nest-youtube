/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from 'src/entities/auth.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,

    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const { userId, parentComment, ...otherData } = createCommentDto;

    // conditions
    if (!createCommentDto) {
      throw new HttpException('comment data not found!', HttpStatus.BAD_REQUEST);
    }

    const userFound = await this.authRepository.findOne({ where: { id: Number(userId) }, select: { id: true, email: true, role: true } });
    if (!userFound) {
      throw new HttpException('user not found in database', HttpStatus.BAD_REQUEST);
    }

    const foundParentComment = await this.commentRepository.findOne({ where: { id: parentComment }, select: ['parentComment'] });
    if (!foundParentComment) {
      throw new HttpException('parentComment not found in database', HttpStatus.BAD_REQUEST);
    }

    console.log('foundParentComment  :', foundParentComment);

    const createdComment = await this.commentRepository.create({
      ...otherData,
      auth: userFound,
      parentComment: foundParentComment,
    });

    await this.commentRepository.save(createdComment);

    return createdComment;
  }

  async findAllComments() {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.auth', 'authAlias')
      .leftJoinAndSelect('comment.video', 'videoAlias')
      .select(['comment', 'authAlias.id', 'authAlias.email', 'authAlias.role', 'videoAlias.id', 'videoAlias.title'])
      .getMany();

    const count = await this.commentRepository.count();

    return { count, comments };
  }

  findOneCommentById(id: number) {
    return `This action returns a #${id} comment`;
  }

  updateCommentById(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  deleteCommentById(id: number) {
    return `This action removes a #${id} comment`;
  }
}
