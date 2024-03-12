import { Inject, Injectable } from '@nestjs/common';
import { PointStrategy } from './interfaces/point-strategy.interface';
import { Point } from './models/point';

class PointService {
  constructor(private _pointStrategy: PointStrategy) {}

  private calculate({ userType, money }) {
    return this._pointStrategy.calculate({ userType, money });
  }

  getPoint({ userType, money }) {
    const amount = this.calculate({ userType, money });
    return new Point(amount);
  }
}

@Injectable()
export class PercentPointService extends PointService {
  constructor(
    @Inject('percentPointStrategy')
    private readonly pointStrategy: PointStrategy,
  ) {
    super(pointStrategy);
  }
}

@Injectable()
export class FullPointService extends PointService {
  constructor(
    @Inject('fullPointStrategy')
    private readonly pointStrategy: PointStrategy,
  ) {
    super(pointStrategy);
  }
}
