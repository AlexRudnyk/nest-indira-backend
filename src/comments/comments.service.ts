import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comments.schema';
import { User } from 'src/users/schemas/users.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Product, ProductDocument } from 'src/products/schemas/products.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getComments(id: string): Promise<Comment[]> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const comments = await this.commentModel.find({ good: id });
    return comments;
  }

  async addComment(
    id: string,
    user: User,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const newComment = await this.commentModel.create({
      ...createCommentDto,
      userName: user.name,
      good: id,
    });
    await this.productModel.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });
    return newComment;
  }
}
