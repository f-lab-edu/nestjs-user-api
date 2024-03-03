import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  balance: 0;

  @Column({ default: 0 })
  point: 0;
}
