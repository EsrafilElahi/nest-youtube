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
      foundParentComment = await this.commentRepository.findOne({
        where: { id: parentComment },
        relations: ['replies', 'parentComment'],
      });

      if (!foundParentComment) {
        throw new HttpException('parentComment not found in database', HttpStatus.BAD_REQUEST);
      }
    }

    const createdComment = this.commentRepository.create({
      ...otherData,
      // auth: userFound, // Include auth if needed
      parentComment: foundParentComment?.id,
      replies: foundParentComment?.replies ? [...foundParentComment.replies] : [],
    });

    await this.commentRepository.save(createdComment);

    console.log('createdComment :', createdComment);
    console.log('foundParentComment :', foundParentComment);

    return { createdComment };
  }

  async findAllComments() {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.auth', 'authAlias')
      .leftJoinAndSelect('comment.video', 'videoAlias')
      .leftJoinAndSelect('comment.replies', 'repliesAlias')
      .leftJoinAndSelect('comment.parentComment', 'parentCommentAlias') // Include parentComment relation for the main comment
      .leftJoinAndSelect('repliesAlias.parentComment', 'parentCommentAliasInner') // Include parentComment relation for replies
      .leftJoinAndSelect('repliesAlias.replies', 'repliesAliasInner') // Include replies relation for replies
      // .where('comment.replies IS EMPTY') // Start with top-level comments
      .andWhere('repliesAlias.id IS NOT NULL') // Check if replies exist (array is not empty)
      .getMany();

    // const comments = await this.commentRepository.find({ relations: ['replies'] });

    const count = await this.commentRepository.count();

    return { count, comments };
  }

  async findOneCommentById(commentId: number) {
    if (!commentId) {
      throw new HttpException('comment id not found in database', HttpStatus.BAD_REQUEST);
    }

    const foundComment = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :commentId', { commentId })
      .leftJoinAndSelect('comment.replies', 'repliesAlias')
      .leftJoinAndSelect('comment.parentComment', 'parentCommentAlias')
      .getOne();

    if (!foundComment) {
      throw new HttpException('comment not found in database', HttpStatus.NOT_FOUND);
    }

    return { foundComment };
  }

  async updateCommentById(commentId: number, updateCommentDto: any) {
    const foundComment = await this.commentRepository.findOne({ where: { id: commentId }, relations: ['replies', 'parentComment'] });

    if (!foundComment) {
      throw new HttpException('comment not found in database', HttpStatus.NOT_FOUND);
    }

    const CommentUpdation = await this.commentRepository
      .createQueryBuilder('comment')
      .update(CommentEntity)
      .set(updateCommentDto)
      .where('id = :commentId', { commentId })
      .execute();

    const updatedComment = await this.commentRepository.find({ where: { id: commentId }, relations: ['replies', 'parentComment'] });

    if (CommentUpdation?.affected === 1) {
      return updatedComment;
    }

    throw new HttpException('comment not found in database', HttpStatus.NOT_FOUND);
  }

  async deleteCommentById(commentId: number) {
    if (!commentId) {
      throw new HttpException('comment id not found!', HttpStatus.BAD_REQUEST);
    }

    const commentFound = await this.commentRepository.findOne({ where: { id: commentId }, relations: ['replies', 'parentComment'] });
    if (!commentFound) {
      throw new HttpException('comment not found in database!', HttpStatus.NOT_FOUND);
    }

    await this.commentRepository.delete(commentId);
    return { message: 'delete comment successfully', deletedComment: commentFound };
  }
}
