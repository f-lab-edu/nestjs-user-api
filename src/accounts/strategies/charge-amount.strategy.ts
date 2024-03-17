import { Injectable } from '@nestjs/common';
import { AmountStrategy } from '../interfaces/amount-strategy.interface';
import { IUserType } from '../../users/interfaces/user-type.interface';
import { Amount } from '../models/amount';

@Injectable()
export class ChargeAmountStrategy implements AmountStrategy {
  calculate({
    amount,
    userType,
  }: {
    amount: number;
    userType: IUserType;
  }): Amount {
    return new Amount(amount, 0.1, userType);
  }
}
