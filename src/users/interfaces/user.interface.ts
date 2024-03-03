import { IUserType } from './user-type.interface';

export interface IUser {
  id: number;
  type: IUserType;
  email: string;
  name: string;
  refreshToken: string;
}
