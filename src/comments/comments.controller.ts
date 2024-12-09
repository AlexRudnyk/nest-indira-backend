import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Schema } from 'mongoose';
import { ReplyCommentDto } from './dto/reply-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  getComments(@Param('id') id: string) {
    return this.commentsService.getComments(id);
  }

  @Post(':id')
  @UsePipes(new ValidationPipe())
  addComment(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const user = req.user;
    return this.commentsService.addComment(id, user, createCommentDto);
  }

  @Delete(':id')
  removeComment(@Param('id') id: Schema.Types.ObjectId) {
    return this.commentsService.removeComment(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  replyComment(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() replyCommentDto: ReplyCommentDto,
  ) {
    return this.commentsService.replyComment(id, replyCommentDto);
  }
}
