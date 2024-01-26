import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  findAllComments() {
    return this.commentService.findAllComments();
  }

  @Get(':id')
  findOneCommentById(@Param('id') id: number) {
    return this.commentService.findOneCommentById(id);
  }

  @Patch('/:id/edit')
  updateCommentById(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateCommentById(id, updateCommentDto);
  }

  @Delete('/:id/delete')
  deleteCommentById(@Param('id') id: number) {
    return this.commentService.deleteCommentById(id);
  }
}
