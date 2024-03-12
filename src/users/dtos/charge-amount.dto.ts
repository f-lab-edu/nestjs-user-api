import { IsInt, IsNumber, Min } from 'class-validator';

export class ChargeAmountDto {
  @IsNumber()
  @IsInt()
  @Min(1)
  amount: number;
}
