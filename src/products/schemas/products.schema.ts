import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Product {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  description: string;

  @Prop()
  photoURL: string;

  @Prop()
  price: number;

  //   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }] })
  //   comments: Comment[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
