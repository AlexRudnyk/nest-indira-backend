import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/auth-user.schema';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    try {
      if (bearer !== 'Bearer') {
        throw new UnauthorizedException('Not authorized');
      }

      const { id } = verify(token, process.env.ACCESS_SECRET_KEY) as {
        id: string;
      };
      const user = await this.userModel.findById(id);
      if (!user || !user.accessToken) {
        throw new UnauthorizedException('Not authorized');
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res
          .status(401)
          .json({ message: 'Token expired. Please log in again.' });
      } else {
        next(error);
      }
    }
  }
}
