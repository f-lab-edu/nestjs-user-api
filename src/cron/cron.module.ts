import { Module } from '@nestjs/common';
import { AdjustAmountStrategy } from '../accounts/strategies/adjust-amount.strategy';
import { UsersModule } from '../users/users.module';
import { AccountsModule } from '../accounts/accounts.module';
import { CronService } from './cron.service';

@Module({
  imports: [UsersModule, AccountsModule],
  providers: [
    { provide: 'adjustAmountStrategy', useClass: AdjustAmountStrategy },
    CronService,
  ],
})
export class CronModule {}
