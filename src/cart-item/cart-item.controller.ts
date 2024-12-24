import {
  Body,
  Controller,
  Param,
  // Delete,
  // Get,
  // HttpCode,
  // Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
// import { Schema } from 'mongoose';
import { Request } from 'express';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Types } from 'mongoose';

@Controller('cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  addToCart(@Req() req: Request, @Body() addToCartDto: AddToCartDto) {
    const user = req.user;
    return this.cartItemService.addToCart(addToCartDto, user);
  }

  @Post('increment/:id')
  increment(@Param('id') id: Types.ObjectId, @Req() req: Request) {
    const user = req.user;
    return this.cartItemService.increment(id, user);
  }

  @Post('decrement/:id')
  decrement(@Param('id') id: Types.ObjectId, @Req() req: Request) {
    const user = req.user;
    return this.cartItemService.decrement(id, user);
  }

  // @Delete('removefromcart/:id')
  // removeFromCart(@Param('id') id: Schema.Types.ObjectId, @Req() req: Request) {
  //   const user = req.user;
  //   return this.cartItemService.removeFromCart;
  // }

  // @Get()
  // @HttpCode(204)
  // clearCart(@Req() req: Request) {
  //   const user = req.user;
  //   return this.cartItemService.clearCart();
  // }
}
