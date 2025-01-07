import { Model, Schema } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comments.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ProductDocument } from 'src/products/schemas/products.schema';
import { ReplyCommentDto } from './dto/reply-comment.dto';
import { User } from 'src/auth/schemas/auth-user.schema';
export declare class CommentsService {
    private commentModel;
    private productModel;
    constructor(commentModel: Model<CommentDocument>, productModel: Model<ProductDocument>);
    getComments(id: string): Promise<Comment[]>;
    addComment(id: string, user: User, createCommentDto: CreateCommentDto): Promise<Comment>;
    removeComment(id: Schema.Types.ObjectId): Promise<Comment>;
    replyComment(id: Schema.Types.ObjectId, replyCommentDto: ReplyCommentDto): Promise<Comment>;
}
