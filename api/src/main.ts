import * as APP_CONFIG from '@app/app.config'
import { AppModule } from '@app/app.module'
import logger from '@app/utils/logger'
import { NestFactory } from '@nestjs/core'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { environment, isProdEnv } from './app.environment'
import { HttpExceptionFilter } from './filters/error.filter'
import { ErrorInterceptor } from './interceptors/error.interceptor'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { TransformInterceptor } from './interceptors/transformer.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, isProdEnv ? { logger: false } : {})
  app.enableCors()
  app.use(helmet())
  app.use(compression())
  app.use(cookieParser())
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor(), new ErrorInterceptor())

  return await app.listen(APP_CONFIG.APP.PORT)
}

bootstrap().then(() => {
  logger.success(
    `${APP_CONFIG.APP.NAME} app is running!`,
    `| env: ${environment}`,
    `| port: ${APP_CONFIG.APP.PORT}`,
    `| ${new Date().toLocaleString()}`
  )
})
