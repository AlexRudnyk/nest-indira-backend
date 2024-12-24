import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartItem, CartItemDocument } from './schemas/cart-item.schema';
import { Model } from 'mongoose';
import { UserWithId } from 'src/types/userWithId';
import { User, UserDocument } from 'src/auth/schemas/auth-user.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async addToCart(
    addToCartDto: AddToCartDto,
    user: UserWithId,
  ): Promise<AddToCartDto> {
    const foundUser = await this.userModel.findById(user._id);
    const isInCart = foundUser.productsInCart.find(
      (product) => product._id.toString() === addToCartDto._id.toString(),
    );
    if (isInCart)
      throw new ConflictException(
        `Product with id: ${addToCartDto._id} is already in cart`,
      );

    await this.userModel.findByIdAndUpdate(foundUser._id, {
      $push: { productsInCart: addToCartDto },
    });

    return addToCartDto;
  }

  //   async removeFromCart(
  //     id: Schema.Types.ObjectId,
  //     user: UserWithId,
  //   ): Promise<Schema.Types.ObjectId> {
  //     if (!isValidObjectId(id)) {
  //       throw new BadRequestException(`Invalid ID format: ${id}`);
  //     }
  //     const foundUser = await this.userModel.findById(user._id);
  //     const isInCart = foundUser.productsInCart.includes(id);
  //     if (!isInCart)
  //       throw new NotFoundException(`Product with id: ${id} is not in cart`);

  //     await this.userModel.findByIdAndUpdate(foundUser._id, {
  //       $pull: { productsInCart: id },
  //     });

  //     return id;
  //   }

  //   async clearCart(user: UserWithId): Promise<{ message: string }> {
  //     await this.userModel.findByIdAndUpdate(user._id, { productsInCart: [] });

  //     return { message: 'Cart is cleared' };
  //   }
}
