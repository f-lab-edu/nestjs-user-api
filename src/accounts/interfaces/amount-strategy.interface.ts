import { IUserType } from '../../users/interfaces/user-type.interface';
import { Amount } from '../models/amount';

export interface AmountStrategy {
  calculate({
    amount,
    userType,
  }: {
    amount: number;
    userType: IUserType;
  }): Amount;
}
