import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as _Promise from 'bluebird';
import { AmountStrategy } from '../accounts/interfaces/amount-strategy.interface';
import { UsersService } from '../users/users.service';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class CronService {
  constructor(
    private usersService: UsersService,
    private accountsService: AccountsService,
    @Inject('adjustAmountStrategy') private amountStrategy: AmountStrategy,
  ) {}

  @Cron('0 8 * * *')
  async adjustAmount() {
    const users = await this.usersService.findAll();
    await _Promise.map(
      users,
      async (user) => {
        const wallet = this.amountStrategy.calculate({
          amount: user.account.balance,
          userType: user.type,
        });
        await this.accountsService.update({
          id: user.account.id,
          wallet,
        });
      },
      { concurrency: 5 },
    );
  }
}
