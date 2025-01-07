import { Model, Schema } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { UserWithId } from 'src/types/userWithId';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './schemas/auth-user.schema';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    register(registerUserDto: RegisterUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
        user: Pick<User, 'name' | 'phone' | 'role' | 'email' | 'productsInCart'> & {
            _id: Schema.Types.ObjectId;
        };
    }>;
    logout(user: UserWithId): Promise<void>;
    getCurrent(user: UserWithId): Promise<Omit<UserWithId, 'password' | 'accessToken' | 'setPassword' | 'comparePassword'>>;
}
