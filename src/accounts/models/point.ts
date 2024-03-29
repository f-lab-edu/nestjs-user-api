import { Injectable } from '@nestjs/common';
import { InitializationError } from '../../common/errors/initialization.error';

@Injectable()
export class Point {
  private amount: number;

  constructor(amount: number) {
    if (amount < 0) {
      throw new InitializationError('invalid amount');
    }
    this.amount = Math.trunc(amount);
  }

  get value() {
    return this.amount;
  }
}
