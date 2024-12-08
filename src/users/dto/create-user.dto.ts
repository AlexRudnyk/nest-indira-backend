import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsDefined,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined({ message: 'Name is required' })
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
