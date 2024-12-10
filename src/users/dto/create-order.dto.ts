import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/schemas/products.schema';

export class CreateOrderDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: Product[];

  @IsInt()
  totalSum: number;
}
