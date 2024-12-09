import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';

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
}
