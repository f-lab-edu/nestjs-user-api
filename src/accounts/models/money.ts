import { Injectable } from '@nestjs/common';

@Injectable()
export class Money {
  constructor(private amount: number) {}

  get value() {
    return this.amount;
  }
}
