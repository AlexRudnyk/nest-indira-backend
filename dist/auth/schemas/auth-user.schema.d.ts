import { Document } from 'mongoose';
import { CartItem } from 'src/cart-item/schemas/cart-item.schema';
export type UserDocument = User & Document;
export declare class User {
    name: string;
    phone: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN';
    accessToken: string;
    productsInCart: CartItem[];
    setPassword(password: string): void;
    comparePassword(password: string): boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
