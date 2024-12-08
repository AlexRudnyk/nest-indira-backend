import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User {
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
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.setPassword = function (password: string): void {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};
