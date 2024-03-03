import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class Money {
  private amount: number;

  constructor(amount: number) {
    if (amount < 0) throw new BadRequestException('invalid amount');
    this.amount = amount;
  }

  get value() {
    return this.amount;
  }
}
