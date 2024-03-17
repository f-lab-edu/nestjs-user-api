import { Injectable } from '@nestjs/common';

@Injectable()
export class Money {
  amount: number;

  constructor(amount: number) {
    this.amount = Math.trunc(amount);
  }

  get value() {
    return this.amount;
  }
}
