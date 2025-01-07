import { Document, Schema as MongooseSchema } from 'mongoose';
export type CartItemDocument = CartItem & Document;
export declare class CartItem {
    _id: MongooseSchema.Types.ObjectId;
    title: string;
    text: string;
    photoURL: string;
    quantity: number;
    price: number;
}
export declare const CartItemSchema: MongooseSchema<CartItem, import("mongoose").Model<CartItem, any, any, any, Document<unknown, any, CartItem> & CartItem & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CartItem, Document<unknown, {}, import("mongoose").FlatRecord<CartItem>> & import("mongoose").FlatRecord<CartItem> & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}>;
