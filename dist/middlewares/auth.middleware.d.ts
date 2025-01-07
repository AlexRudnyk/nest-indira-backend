import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { UserDocument } from 'src/auth/schemas/auth-user.schema';
export declare class AuthMiddleware implements NestMiddleware {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
