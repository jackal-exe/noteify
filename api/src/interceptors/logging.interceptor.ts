import { isDevEnv } from '@app/app.environment'
import { createLogger } from '@app/utils/logger'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

const logger = createLogger({ scope: 'LoggingInterceptor', time: isDevEnv })

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    if (!isDevEnv) {
      return next.handle()
    }
    const request = context.switchToHttp().getRequest<Request>()
    const content = request.method.padStart(6, '_') + ' -> ' + request.url
    logger.debug('+++ REQ:', content)
    const now = Date.now()
    return next.handle().pipe(tap(() => logger.debug('--- RES:', content, '|', `${Date.now() - now}ms`)))
  }
}
