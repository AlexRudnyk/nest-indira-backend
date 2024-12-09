import { UserDocument } from 'src/users/schemas/users.schema';

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument; // Add the user property to the Request object
    }
  }
}
