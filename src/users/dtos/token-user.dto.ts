import { IsNumber, IsEmail } from 'class-validator';

export class TokenUserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;
}
