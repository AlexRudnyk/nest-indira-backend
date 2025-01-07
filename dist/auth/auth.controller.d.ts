import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { UserWithId } from 'src/types/userWithId';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerUserDto: RegisterUserDto): Promise<import("./schemas/auth-user.schema").User>;
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
        user: Pick<import("./schemas/auth-user.schema").User, "name" | "phone" | "role" | "email" | "productsInCart"> & {
            _id: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    logout(req: Request): Promise<void>;
    getCurrent(req: Request): Promise<Omit<UserWithId, "password" | "accessToken" | "setPassword" | "comparePassword">>;
}
