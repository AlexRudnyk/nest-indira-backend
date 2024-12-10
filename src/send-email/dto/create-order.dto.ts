import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';

class ProductDto {
  @IsString()
  @Length(2, 50)
  title: string;

  @IsInt()
  @Min(1)
  price: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsInt()
  totalSum: number;
}
