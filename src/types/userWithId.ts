import { Schema } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type UserWithId = User & { _id: Schema.Types.ObjectId };
