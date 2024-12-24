import { IsString, IsInt, IsNotEmpty, IsUrl, IsMongoId } from 'class-validator';
import { Schema } from 'mongoose';

export class AddToCartDto {
  @IsMongoId()
  _id: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsUrl()
  @IsNotEmpty()
  photoURL: string;

  @IsInt()
  @IsNotEmpty()
  price: number;
}
