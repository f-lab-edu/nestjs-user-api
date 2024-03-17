import { Injectable } from '@nestjs/common';
import { AmountStrategy } from '../interfaces/amount-strategy.interface';
import { IUserType } from '../../users/interfaces/user-type.interface';
import { Wallet } from '../models/wallet';

@Injectable()
export class AdjustAmountStrategy implements AmountStrategy {
  calculate({
    amount,
    userType,
  }: {
    amount: number;
    userType: IUserType;
  }): Wallet {
    return new Wallet(amount, { money: -0.01, point: -1 }, userType);
  }
}
