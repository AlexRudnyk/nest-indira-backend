import { CartItemService } from './cart-item.service';
import { Request } from 'express';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Types } from 'mongoose';
export declare class CartItemController {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    addToCart(req: Request, addToCartDto: AddToCartDto): Promise<AddToCartDto>;
    increment(id: Types.ObjectId, req: Request): Promise<number>;
    decrement(id: Types.ObjectId, req: Request): Promise<number>;
    removeFromCart(id: Types.ObjectId, req: Request): Promise<Types.ObjectId>;
    clearCart(req: Request): Promise<{
        message: string;
    }>;
}
