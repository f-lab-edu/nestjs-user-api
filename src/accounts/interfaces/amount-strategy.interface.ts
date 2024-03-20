import { IUserType } from '../../users/interfaces/user-type.interface';
import { Wallet } from '../models/wallet';

export interface AmountStrategy {
  calculate({
    amount,
    userType,
  }: {
    amount: number;
    userType: IUserType;
  }): Wallet;
}
