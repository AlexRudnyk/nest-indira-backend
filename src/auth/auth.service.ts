import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto, req: Request): Promise<User> {
    const { phone, email, password } = req.body;

    const userEmail = await this.userModel.findOne({ email });
    if (userEmail) throw new ConflictException(`${email} is already in use`);

    const userPhone = await this.userModel.findOne({ phone });
    if (userPhone) throw new ConflictException(`${phone} is already in use`);

    const newUser = new this.userModel(createUserDto);
    newUser.setPassword(password);
    return await newUser.save();
  }
}
