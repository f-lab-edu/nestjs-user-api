import { UserType } from './user-type.interface';

export interface IUser {
  id: number;
  type: UserType;
  email: string;
  name: string;
  refreshToken: string;
}
