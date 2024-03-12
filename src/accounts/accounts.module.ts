import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './models/account.entity';
import { AccountsService } from './accounts.service';
import { PercentPointStrategy } from './strategies/percent-point.strategy';
import { FullPointStrategy } from './strategies/full-point.strategy';
import { FullPointService, PercentPointService } from './point.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [
    {
      provide: 'percentPointStrategy',
      useClass: PercentPointStrategy,
    },
    {
      provide: 'fullPointStrategy',
      useClass: FullPointStrategy,
    },
    PercentPointService,
    FullPointService,
    AccountsService,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
