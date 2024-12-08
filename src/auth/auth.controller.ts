import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.authService.register(createUserDto, req);
  }
}
