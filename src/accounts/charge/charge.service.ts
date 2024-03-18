import { Injectable } from '@nestjs/common';
import { Wallet } from '../models/wallet';
import { AccountsService } from '../accounts.service';
import { UsersService } from '../../users/users.service';

export interface MultiplierToChargeAmount {
  money: number;
  point: number;
}

@Injectable()
export class ChargeService {
  constructor(
    private accountsService: AccountsService,
    private userService: UsersService,
    private multiplierToChargeAmount: MultiplierToChargeAmount,
  ) {}

  async charge(userId: number, amount: number) {
    const user = await this.userService.find(userId);
    if (!user) {
      throw new Error(`user id: ${userId} not found`);
    }

    const updatedWallet = new Wallet(
      amount,
      this.multiplierToChargeAmount,
      user.type,
    );

    await this.accountsService.update({
      id: user.account.id,
      wallet: updatedWallet,
    });
    return this.accountsService.find({ id: user.account.id });
  }
}
