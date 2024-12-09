import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Schema } from 'mongoose';
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
    const comments = await this.commentModel.find({ product: id });
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
      product: id,
    });
    await this.productModel.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });
    return newComment;
  }

  async removeComment(id: Schema.Types.ObjectId): Promise<Comment> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const comment = await this.commentModel.findById(id);
    if (!comment)
      throw new NotFoundException(`Comment with id: ${id} not found`);
    const productId = comment.product;

    await this.productModel.findByIdAndUpdate(productId, {
      $pull: { comments: id },
    });
    const removedComment = await this.commentModel.findByIdAndDelete(id);
    return removedComment;
  }
}
