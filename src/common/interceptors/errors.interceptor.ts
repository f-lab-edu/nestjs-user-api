import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { InitializationError } from '../errors/initialization.error';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((e) => {
        if (e instanceof InitializationError) {
          return throwError(() => new BadRequestException(e.message));
        }
        return throwError(() => e);
      }),
    );
  }
}
