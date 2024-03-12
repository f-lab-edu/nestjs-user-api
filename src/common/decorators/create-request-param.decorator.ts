import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const createRequestParamDecorator = (prop: string) => {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[prop];
  });
};
