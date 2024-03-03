import { Expose } from 'class-transformer';

export class AccountDto {
  @Expose()
  balance: number;

  @Expose()
  point: number;
}
