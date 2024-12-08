import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: 'USER' | 'ADMIN';

  @Prop()
  accessToken: string;

  setPassword(password: string): void {
    this.password = hashSync(password, genSaltSync(10));
  }

  comparePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.setPassword = function (password: string): void {
  this.password = hashSync(password, genSaltSync(10));
};

UserSchema.methods.comparePassword = function (password: string): boolean {
  return compareSync(password, this.password);
};
