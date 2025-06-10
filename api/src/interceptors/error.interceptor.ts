import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

/**
 * @class ErrorInterceptor
 * @classdesc catch error when controller Promise rejected
 */

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        return throwError(
          () => new HttpException({ message: error.message, error }, HttpStatus.INTERNAL_SERVER_ERROR)
        )
      })
    )
  }
}
