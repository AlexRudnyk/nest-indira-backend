import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { sign } from 'jsonwebtoken';
import { LoginUserDto } from './dto/login-user.dto';
import { UserWithId } from 'src/types/userWithId';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { phone, email, password } = createUserDto;

    const userEmail = await this.userModel.findOne({ email });
    if (userEmail) throw new ConflictException(`${email} is already in use`);

    const userPhone = await this.userModel.findOne({ phone });
    if (userPhone) throw new ConflictException(`${phone} is already in use`);

    const newUser = new this.userModel({
      ...createUserDto,
      role: 'USER',
      accessToken: null,
    });
    newUser.setPassword(password);
    return await newUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{
    accessToken: string;
    user: Pick<User, 'name' | 'phone' | 'role' | 'email'> & {
      _id: Types.ObjectId;
    };
  }> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user || !user.comparePassword(password))
      throw new UnauthorizedException(
        'Email or password is wrong or not registered',
      );
    const payload = { id: user._id };
    const accessToken = sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: '1d',
    });

    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      { accessToken },
      { new: true },
    );

    const { _id, name, phone, role } = updatedUser;
    return {
      accessToken,
      user: {
        _id: _id as Types.ObjectId,
        name,
        phone,
        email,
        role,
      },
    };
  }

  async logout(user: UserWithId): Promise<void> {
    const { _id } = user;
    await this.userModel.findByIdAndUpdate(_id, { accessToken: null });
  }
}
