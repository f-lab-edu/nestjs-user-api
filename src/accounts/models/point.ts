import { Injectable } from '@nestjs/common';
import { Money } from './money';
import { IUserType } from '../../users/interfaces/user-type.interface';

@Injectable()
export class Point {
  private percent: 0.1;
  private amount: number;

  constructor(userType: IUserType, money: Money) {
    if (userType === IUserType.BUSINESS) {
      this.amount = Math.trunc(money.value * this.percent);
    } else {
      this.amount = 0;
    }
  }

  get value() {
    return this.amount;
  }
}
