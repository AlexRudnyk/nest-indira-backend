import { CartItemDocument } from './schemas/cart-item.schema';
import { Model, Types } from 'mongoose';
import { UserWithId } from 'src/types/userWithId';
import { UserDocument } from 'src/auth/schemas/auth-user.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartItemService {
    private cartItemModel;
    private userModel;
    constructor(cartItemModel: Model<CartItemDocument>, userModel: Model<UserDocument>);
    addToCart(addToCartDto: AddToCartDto, user: UserWithId): Promise<AddToCartDto>;
    increment(id: Types.ObjectId, user: UserWithId): Promise<number>;
    decrement(id: Types.ObjectId, user: UserWithId): Promise<number>;
    removeFromCart(id: Types.ObjectId, user: UserWithId): Promise<Types.ObjectId>;
    clearCart(user: UserWithId): Promise<{
        message: string;
    }>;
}
