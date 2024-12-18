import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { LoginUserDto } from './dto/login-user.dto';
import { UserWithId } from 'src/types/userWithId';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './schemas/auth-user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { phone, email, password } = registerUserDto;

    const userEmail = await this.userModel.findOne({ email });
    if (userEmail)
      throw new ConflictException(`Email ${email} is already in use`);

    const userPhone = await this.userModel.findOne({ phone });
    if (userPhone)
      throw new ConflictException(`Phone ${phone} is already in use`);

    const newUser = new this.userModel(registerUserDto);
    newUser.setPassword(password);
    return await newUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{
    accessToken: string;
    user: Pick<User, 'name' | 'phone' | 'role' | 'email'> & {
      _id: Schema.Types.ObjectId;
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
      expiresIn: '1h',
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
        _id: _id as Schema.Types.ObjectId,
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

  async getCurrent(
    user: UserWithId,
  ): Promise<
    Omit<
      UserWithId,
      | 'password'
      | 'accessToken'
      | 'setPassword'
      | 'comparePassword'
      | 'productsInCart'
    >
  > {
    const { _id, name, phone, email, role } = user;
    return {
      _id,
      name,
      phone,
      email,
      role,
    };
  }
}
