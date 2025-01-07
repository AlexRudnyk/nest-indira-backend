"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comments_schema_1 = require("./schemas/comments.schema");
const products_schema_1 = require("../products/schemas/products.schema");
let CommentsService = class CommentsService {
    constructor(commentModel, productModel) {
        this.commentModel = commentModel;
        this.productModel = productModel;
    }
    async getComments(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
        const comments = await this.commentModel.find({ product: id });
        return comments;
    }
    async addComment(id, user, createCommentDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
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
    async removeComment(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
        const comment = await this.commentModel.findById(id);
        if (!comment)
            throw new common_1.NotFoundException(`Comment with id: ${id} not found`);
        const productId = comment.product;
        await this.productModel.findByIdAndUpdate(productId, {
            $pull: { comments: id },
        });
        const removedComment = await this.commentModel.findByIdAndDelete(id);
        return removedComment;
    }
    async replyComment(id, replyCommentDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
        const commentToReply = await this.commentModel.findById(id);
        if (!commentToReply)
            throw new common_1.NotFoundException(`Comment with id: ${id} not found`);
        const repliedComment = await this.commentModel.findByIdAndUpdate(id, {
            reply: replyCommentDto.text,
        }, { new: true });
        return repliedComment;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CommentsService);
//# sourceMappingURL=comments.service.js.map