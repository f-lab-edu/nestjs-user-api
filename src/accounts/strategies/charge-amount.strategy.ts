import { Injectable } from '@nestjs/common';
import { AmountStrategy } from '../interfaces/amount-strategy.interface';
import { IUserType } from '../../users/interfaces/user-type.interface';
import { Wallet } from '../models/wallet';

@Injectable()
export class ChargeAmountStrategy implements AmountStrategy {
  calculate({
    amount,
    userType,
  }: {
    amount: number;
    userType: IUserType;
  }): Wallet {
    return new Wallet(amount, { money: 1, point: 0.1 }, userType);
  }
}
