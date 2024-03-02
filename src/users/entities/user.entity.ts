import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { UserType } from '../interfaces/user-type.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserType, default: UserType.PERSONAL })
  type: UserType;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: '' })
  @Index()
  refreshToken: string;
}
