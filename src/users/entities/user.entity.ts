import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IUserType } from '../interfaces/user-type.interface';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: IUserType, default: IUserType.PERSONAL })
  type: IUserType;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: '' })
  @Index()
  refreshToken: string;

  @OneToOne(() => Account, { nullable: false, eager: true })
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
