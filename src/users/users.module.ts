import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './models/user.entity';
import { Account } from '../accounts/models/account.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { ChargeAmountStrategy } from '../accounts/strategies/charge-amount.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account]), AccountsModule],
  controllers: [UsersController],
  providers: [
    { provide: 'chargeAmountStrategy', useClass: ChargeAmountStrategy },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
