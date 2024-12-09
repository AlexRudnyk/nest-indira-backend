import { Schema } from 'mongoose';
import { User } from 'src/auth/schemas/auth-user.schema';

export type UserWithId = User & { _id: Schema.Types.ObjectId };
