import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ReplyCommentDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 5000, {
    message:
      'Comment should be at least 2 characters long but not longer than 5000 characters',
  })
  text: string;
}
