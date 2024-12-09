import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

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

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }] })
  comments: MongooseSchema.Types.ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
