import { Injectable } from '@nestjs/common';
import { Money } from './money';
import { Point } from './point';
import { IUserType } from '../../users/interfaces/user-type.interface';

@Injectable()
export class Amount {
  private money: Money;
  private point: Point;

  constructor(
    amount: number,
    multiplier: number,
    private userType: IUserType,
  ) {
    this.money = new Money(amount);
    if (userType === IUserType.BUSINESS) {
      this.point = new Point(this.money.value * multiplier);
    } else {
      this.point = new Point(this.money.value);
    }
  }

  get value() {
    return {
      money: this.money.value,
      point: this.point.value,
    };
  }
}
