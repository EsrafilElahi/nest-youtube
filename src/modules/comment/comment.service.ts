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
    const userFound = await this.authRepository.findOne({ where: { id: userId }, select: { id: true, email: true, role: true } });
    if (!userFound) {
      throw new HttpException('user not found in database', HttpStatus.BAD_REQUEST);
    }

    // =========start============ foundParentComment =====================
    let foundParentComment = null;
    if (parentComment) {
      foundParentComment = await this.commentRepository.findOne({ where: { id: parentComment } });

      if (!foundParentComment) {
        throw new HttpException('parentComment not found in database', HttpStatus.BAD_REQUEST);
      }
    }

    const createdComment = await this.commentRepository.create({
      ...otherData,
      auth: userFound,
      parentComment: foundParentComment?.id,
      replies: [],
    });

    console.log('createdComment :', createdComment);
    console.log('foundParentComment  :', foundParentComment);

    await this.commentRepository.save(createdComment);

    // Update the replies of the parent comment
    // if (foundParentComment) {
    //   foundParentComment.replies = [...(foundParentComment.replies || []), createdComment];
    //   await this.commentRepository.save(foundParentComment);
    // }

    return { createdComment, foundParentComment };
  }

  async findAllComments() {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      // .leftJoinAndSelect('comment.auth', 'authAlias')
      .leftJoinAndSelect('comment.video', 'videoAlias')
      // .select(['comment', 'authAlias', 'videoAlias'])
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
