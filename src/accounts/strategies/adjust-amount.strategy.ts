import { Injectable } from '@nestjs/common';
import { AmountStrategy } from '../interfaces/amount-strategy.interface';
import { IUserType } from '../../users/interfaces/user-type.interface';
import { Wallet } from '../models/wallet';
import { MULTIPLIER_TO_ADJUST_AMOUNT } from '../constants/amount-strategy.constant';

@Injectable()
export class AdjustAmountStrategy implements AmountStrategy {
  calculate({
    amount,
    userType,
  }: {
    amount: number;
    userType: IUserType;
  }): Wallet {
    return new Wallet(amount, MULTIPLIER_TO_ADJUST_AMOUNT, userType);
  }
}
