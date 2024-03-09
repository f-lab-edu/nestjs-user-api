import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Account } from './models/account.entity';
import { AccountService } from './models/account.service';

const AMOUNT_TYPE = { BALANCE: 'balance', POINT: 'point' };

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private dataSource: DataSource,
  ) {}

  async create(queryRunner: QueryRunner) {
    const account = queryRunner.manager.create(Account);
    return queryRunner.manager.save(Account, account);
  }

  async find(
    { id }: { id: string },
    queryRunner?: QueryRunner,
  ): Promise<Account> {
    return queryRunner
      ? queryRunner.manager.findOneBy(Account, { id })
      : this.accountRepository.findOneBy({ id });
  }

  private async incrementBalance(
    { id, change }: { id: string; change: number },
    queryRunner: QueryRunner,
  ) {
    return queryRunner.manager.increment(
      Account,
      { id },
      AMOUNT_TYPE.BALANCE,
      change,
    );
  }

  private async incrementPoint(
    { id, change }: { id: string; change: number },
    queryRunner: QueryRunner,
  ) {
    return queryRunner.manager.increment(
      Account,
      { id },
      AMOUNT_TYPE.POINT,
      change,
    );
  }

  private async update({ id, balanceChange, pointChange }) {
    const runner = this.dataSource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      await this.incrementBalance({ id, change: balanceChange }, runner);
      await this.incrementPoint({ id, change: pointChange }, runner);
      await runner.commitTransaction();
    } catch (e) {
      console.error(e);
      await runner.rollbackTransaction();
    } finally {
      await runner.release();
    }
  }

  async charge({ id, userType, amount }) {
    const { balanceChange, pointChange } = AccountService.calculateChange(
      userType,
      amount,
    );
    return this.update({ id, balanceChange, pointChange });
  }

  async remove({ id }: { id: string }, queryRunner: QueryRunner) {
    const account = await this.find({ id }, queryRunner);
    if (!account) throw new NotFoundException('account not found');
    return queryRunner.manager.remove(Account, account);
  }
}
