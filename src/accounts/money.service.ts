import { Inject, Injectable } from '@nestjs/common';
import { MoneyStrategy } from './interfaces/money-strategy.interface';
import { Money } from './models/money';

class MoneyService {
  constructor(private _moneyStrategy: MoneyStrategy) {}

  private calculate(amount: number) {
    return this._moneyStrategy.calculate(amount);
  }

  getMoney(amount: number) {
    return new Money(this.calculate(amount));
  }
}

@Injectable()
export class PercentMoneyService extends MoneyService {
  constructor(
    @Inject('percentMoneyStrategy')
    private readonly moneyStrategy: MoneyStrategy,
  ) {
    super(moneyStrategy);
  }
}

@Injectable()
export class FullMoneyService extends MoneyService {
  constructor(
    @Inject('fullMoneyStrategy') private readonly moneyStrategy: MoneyStrategy,
  ) {
    super(moneyStrategy);
  }
}
