import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './models/account.entity';
import { AccountsService } from './accounts.service';
import { PercentPointStrategy } from './strategies/percent-point.strategy';
import { FullPointStrategy } from './strategies/full-point.strategy';
import { FullPointService, PercentPointService } from './point.service';
import { PercentMoneyStrategy } from './strategies/percent-money.strategy';
import { FullMoneyStrategy } from './strategies/full-money.strategy';
import { FullMoneyService, PercentMoneyService } from './money.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [
    {
      provide: 'percentMoneyStrategy',
      useClass: PercentMoneyStrategy,
    },
    {
      provide: 'fullMoneyStrategy',
      useClass: FullMoneyStrategy,
    },
    {
      provide: 'percentPointStrategy',
      useClass: PercentPointStrategy,
    },
    {
      provide: 'fullPointStrategy',
      useClass: FullPointStrategy,
    },
    PercentMoneyService,
    FullMoneyService,
    PercentPointService,
    FullPointService,
    AccountsService,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
