import { Schema } from 'mongoose';
export declare class AddToCartDto {
    _id: Schema.Types.ObjectId;
    title: string;
    text: string;
    photoURL: string;
    price: number;
}
