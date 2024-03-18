import { Injectable } from '@nestjs/common';
import { Wallet } from '../models/wallet';
import { AccountsService } from '../accounts.service';
import { User } from '../../users/models/user.entity';

const DEFAULT_MULTIPLIER_MONEY = -0.01;
const DEFAULT_MULTIPLIER_POINT = -1;

export interface MultiplierToChargeAmount {
  money: number;
  point: number;
}

@Injectable()
export class DepletionService {
  constructor(
    private accountsService: AccountsService,
    private multiplierToChargeAmount?: MultiplierToChargeAmount,
  ) {
    if (!this.multiplierToChargeAmount) {
      this.multiplierToChargeAmount = {
        money: DEFAULT_MULTIPLIER_MONEY,
        point: DEFAULT_MULTIPLIER_POINT,
      };
    }
  }

  async depleteWallet(user: User) {
    const updatedWallet = new Wallet(
      user.account.balance,
      this.multiplierToChargeAmount,
      user.type,
    );

    await this.accountsService.update({
      id: user.account.id,
      wallet: updatedWallet,
    });
  }
}
