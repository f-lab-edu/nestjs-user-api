import { Injectable } from '@nestjs/common';
import { MoneyStrategy } from '../interfaces/money-strategy.interface';

@Injectable()
export class FullMoneyStrategy implements MoneyStrategy {
  calculate(amount: number): number {
    return amount;
  }
}
