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
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { UserWithId } from 'src/types/userWithId';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body(new ValidationPipe())
    registerUserDto: RegisterUserDto,
  ) {
    return this.authService.register(registerUserDto);
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
