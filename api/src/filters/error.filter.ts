import { isDevEnv } from '@app/app.environment'
import { UNDEFINED } from '@app/constants/value.constant'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException
} from '@nestjs/common'

/**
 * @class HttpExceptionFilter
 * @classdesc catch globally exceptions & formatting error message to <HttpErrorResponse>
 */

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest()
    const response = host.switchToHttp().getResponse()

    const errorStatusCode =
      exception['response'].error.status || exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR
    // console.log(errorStatusCode);
    const errorMessage = exception['response'].error.message || exception['message'] || 'InternalServerError'
    // console.log(errorMessage);
    const errorStack = exception['response'].error.stack || exception.stack
    // console.log(errorStack);

    const error = (() => {
      const errorName = exception['response'].error.name || exception['name'] || InternalServerErrorException.name
      if (errorName.toLowerCase().includes('exception')) {
        return errorName.replaceAll('exception', '').replaceAll('Exception', '')
      }
      return errorName
    })()
    // console.log(error);

    const data = {
      success: false,
      statusCode: errorStatusCode,
      message: errorMessage,
      error: error,
      timestamp: new Date().toISOString(),
      debug: isDevEnv ? errorStack : UNDEFINED
    }

    // default 404
    if (exception.getStatus() === HttpStatus.NOT_FOUND) {
      data.statusCode = HttpStatus.NOT_FOUND
      data.error = 'HttpNotFound'
      data.message = `Invalid API: ${request.method} > ${request.url}`
    }

    return response.status(errorStatusCode).jsonp(data)
  }
}
