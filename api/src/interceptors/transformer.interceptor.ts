import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * @class TransformInterceptor
 * @classdesc transform `T` to `HttpResponseSuccess<T>` when controller `Promise` resolved
 */

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, T> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    return next.handle().pipe(
      map((response: any) => {
        return {
          success: true,
          statusCode: 200,
          message: response.message || 'Success',
          params: {
            url: request.url,
            method: request.method,
            routes: request.params,
            payload: request.body
          },
          result: {
            data: response.data
          }
        }
      })
    )
  }
}
