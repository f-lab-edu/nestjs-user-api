import { Injectable } from '@nestjs/common';
import { MoneyStrategy } from '../interfaces/money-strategy.interface';

@Injectable()
export class PercentMoneyStrategy implements MoneyStrategy {
  private percent: number = 0.01;

  calculate(amount: number): number {
    return Math.trunc(amount * this.percent) * -1;
  }
}
