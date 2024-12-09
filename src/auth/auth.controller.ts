import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { UserWithId } from 'src/types/userWithId';

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

  @Get('logout')
  @HttpCode(204)
  logout(@Req() req: Request) {
    const user = req.user as UserWithId;
    return this.authService.logout(user);
  }

  @Get('getCurrent')
  getCurrent(@Req() req: Request) {
    const user = req.user as UserWithId;
    return this.authService.getCurrent(user);
  }
}
