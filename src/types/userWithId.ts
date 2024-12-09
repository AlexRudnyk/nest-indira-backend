import { Types } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type UserWithId = User & { _id: Types.ObjectId };
