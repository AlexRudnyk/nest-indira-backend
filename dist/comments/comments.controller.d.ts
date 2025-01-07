import { CommentsService } from './comments.service';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Schema } from 'mongoose';
import { ReplyCommentDto } from './dto/reply-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getComments(id: string): Promise<import("./schemas/comments.schema").Comment[]>;
    addComment(id: string, req: Request, createCommentDto: CreateCommentDto): Promise<import("./schemas/comments.schema").Comment>;
    removeComment(id: Schema.Types.ObjectId): Promise<import("./schemas/comments.schema").Comment>;
    replyComment(id: Schema.Types.ObjectId, replyCommentDto: ReplyCommentDto): Promise<import("./schemas/comments.schema").Comment>;
}
