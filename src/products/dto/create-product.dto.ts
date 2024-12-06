import { IsString, IsInt, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  text: string;

  @IsString()
  description: string;

  @IsUrl()
  photoURL: string;

  @IsInt()
  @IsNotEmpty()
  price: number;
}
