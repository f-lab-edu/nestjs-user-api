import { Injectable } from '@nestjs/common';
import { InitializationError } from '../../common/errors/initialization.error';

@Injectable()
export class Point {
  constructor(private amount: number) {
    if (amount < 0) {
      throw new InitializationError('invalid amount');
    }
    this.amount = amount;
  }

  get value() {
    return this.amount;
  }
}
