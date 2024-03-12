import { IUserType } from '../../users/interfaces/user-type.interface';
import { Money } from '../models/money';

export interface PointStrategy {
  calculate({ userType, money }: { userType: IUserType; money: Money }): number;
}
