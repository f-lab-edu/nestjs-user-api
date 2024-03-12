import { Injectable } from '@nestjs/common';
import { PointStrategy } from '../interfaces/point-strategy.interface';
import { IUserType } from '../../users/interfaces/user-type.interface';
import { Money } from '../models/money';

@Injectable()
export class FullPointStrategy implements PointStrategy {
  calculate({
    userType,
    money,
  }: {
    userType: IUserType;
    money: Money;
  }): number {
    if (userType === IUserType.BUSINESS) {
      return Math.abs(money.value);
    }
    return 0;
  }
}
