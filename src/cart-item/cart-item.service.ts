import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartItem, CartItemDocument } from './schemas/cart-item.schema';
import { Model, Types } from 'mongoose';
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

  async increment(id: Types.ObjectId, user: UserWithId): Promise<number> {
    const foundUser = await this.userModel.findOneAndUpdate(
      {
        _id: user._id,
        'productsInCart._id': id,
      },
      {
        $inc: { 'productsInCart.$.quantity': 1 },
      },
      {
        new: true,
      },
    );

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${user._id} not found`);
    }

    const updatedProduct = foundUser.productsInCart.find(
      (product) => product._id.toString() === id.toString(),
    );

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found in cart`);
    }

    return updatedProduct.quantity;
  }

  async decrement(id: Types.ObjectId, user: UserWithId): Promise<number> {
    const foundUser = await this.userModel.findOneAndUpdate(
      {
        _id: user._id,
        'productsInCart._id': id,
      },
      {
        $inc: { 'productsInCart.$.quantity': -1 },
      },
      {
        new: true,
      },
    );

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${user._id} not found`);
    }

    const updatedProduct = foundUser.productsInCart.find(
      (product) => product._id.toString() === id.toString(),
    );

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found in cart`);
    }

    return updatedProduct.quantity;
  }

  async removeFromCart(
    id: Types.ObjectId,
    user: UserWithId,
  ): Promise<Types.ObjectId> {
    await this.userModel.findByIdAndUpdate(
      {
        _id: user._id,
        'productsInCart._id': id,
      },
      {
        $pull: { productsInCart: { _id: id } },
      },
      { new: true },
    );
    return id;
  }

  async clearCart(user: UserWithId): Promise<{ message: string }> {
    await this.userModel.findByIdAndUpdate(user._id, { productsInCart: [] });

    return { message: 'Cart is cleared' };
  }
}
