import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Schema } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/auth-user.schema';
import { UserWithId } from 'src/types/userWithId';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addToCart(
    id: Schema.Types.ObjectId,
    user: UserWithId,
  ): Promise<Schema.Types.ObjectId> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const foundUser = await this.userModel.findById(user._id);
    const isInCart = foundUser.productsInCart.includes(id);
    if (isInCart)
      throw new ConflictException(`Product with id: ${id} is already in cart`);

    await this.userModel.findByIdAndUpdate(foundUser._id, {
      $push: { productsInCart: id },
    });

    return id;
  }

  async removeFromCart(
    id: Schema.Types.ObjectId,
    user: UserWithId,
  ): Promise<Schema.Types.ObjectId> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const foundUser = await this.userModel.findById(user._id);
    const isInCart = foundUser.productsInCart.includes(id);
    if (!isInCart)
      throw new NotFoundException(`Product with id: ${id} is not in cart`);

    await this.userModel.findByIdAndUpdate(foundUser._id, {
      $pull: { productsInCart: id },
    });

    return id;
  }

  async clearCart(user: UserWithId): Promise<{ message: string }> {
    await this.userModel.findByIdAndUpdate(user._id, { productsInCart: [] });

    return { message: 'Cart is cleared' };
  }
}
