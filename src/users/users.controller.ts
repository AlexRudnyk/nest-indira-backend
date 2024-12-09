import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Schema } from 'mongoose';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('addtocart/:id')
  addToCart(@Param('id') id: Schema.Types.ObjectId, @Req() req: Request) {
    const user = req.user;
    return this.usersService.addToCart(id, user);
  }

  @Delete('removefromcart/:id')
  removeFromCart(@Param('id') id: Schema.Types.ObjectId, @Req() req: Request) {
    const user = req.user;
    return this.usersService.removeFromCart(id, user);
  }

  @Get()
  @HttpCode(204)
  clearCart(@Req() req: Request) {
    const user = req.user;
    return this.usersService.clearCart(user);
  }
}
