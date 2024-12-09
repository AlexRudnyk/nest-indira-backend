import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Comment {
  @Prop()
  userName: string;

  @Prop()
  text: string;

  @Prop()
  reply: string;

  @Prop()
  good: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
