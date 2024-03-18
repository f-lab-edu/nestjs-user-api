import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as _Promise from 'bluebird';
import { UsersService } from '../users/users.service';
import { DepletionService } from '../accounts/deplation/depletion.service';

@Injectable()
export class CronService {
  constructor(
    private usersService: UsersService,
    private depletionService: DepletionService,
  ) {}

  @Cron('0 8 * * *')
  async adjustAmount() {
    const users = await this.usersService.findAll();
    await _Promise.map(
      users,
      (user) => this.depletionService.depleteWallet(user),
      { concurrency: 5 },
    );
  }
}
