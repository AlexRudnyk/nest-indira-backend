import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Types } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(
    @Body(new ValidationPipe())
    loginUserDto: LoginUserDto,
  ) {
    return this.authService.login(loginUserDto);
  }

  @Delete('logout/:id')
  @HttpCode(204)
  logout(@Param('id') id: Types.ObjectId) {
    return this.authService.logout(id);
  }
}
