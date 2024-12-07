import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEnum(['USER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'USER' | 'ADMIN';

  @IsString()
  accessToken: string;
}
