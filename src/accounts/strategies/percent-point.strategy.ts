import { Injectable } from '@nestjs/common';
import { PointStrategy } from '../interfaces/point-strategy.interface';
import { IUserType } from '../../users/interfaces/user-type.interface';
import { Money } from '../models/money';

@Injectable()
export class PercentPointStrategy implements PointStrategy {
  private percent: number = 0.1;

  calculate({
    userType,
    money,
  }: {
    userType: IUserType;
    money: Money;
  }): number {
    if (userType === IUserType.BUSINESS) {
      return Math.trunc(money.value * this.percent);
    }
    return 0;
  }
}
