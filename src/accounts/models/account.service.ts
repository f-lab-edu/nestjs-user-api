import { Injectable } from '@nestjs/common';
import { IUserType } from '../../users/interfaces/user-type.interface';
import { Money } from './money';
import { Point } from './point';

@Injectable()
export class AccountService {
  static calculateChange(userType: IUserType, amount: number) {
    const money = new Money(amount);
    const point = new Point(userType, money);
    return {
      balanceChange: money.value,
      pointChange: point.value,
    };
  }
}
