// https://github.com/nestjs/cache-manager/blob/master/lib/cache.module.ts
// https://github.com/nestjs/cache-manager/blob/master/lib/cache.providers.ts
// https://gist.github.com/kyle-mccarthy/b6770b49ebfab88e75bcbac87b272a94

import * as APP_CONFIG from '@app/app.config'
import { createLogger } from '@app/utils/logger'
import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common'
import { createClient, RedisClientType } from 'redis'
import { createRedisStore, RedisClientOptions, RedisStore } from './redis.store'

const logger = createLogger({ scope: 'RedisService', time: true })

@Injectable()
export class RedisService implements OnApplicationBootstrap, OnApplicationShutdown {
  private redisStore!: RedisStore
  private redisClient!: RedisClientType

  constructor() {
    this.redisClient = createClient(this.getOptions()) as RedisClientType
    this.redisStore = createRedisStore(this.redisClient, {
      defaultTTL: APP_CONFIG.APP.DEFAULT_CACHE_TTL,
      namespace: APP_CONFIG.REDIS.namespace
    })
  }

  onApplicationBootstrap() {
    // https://github.com/redis/node-redis#events
    this.redisClient.on('connect', () => logger.log('connecting...'))
    this.redisClient.on('reconnecting', () => logger.log('reconnecting...'))
    this.redisClient.on('ready', () => logger.success('readied (connected).'))
    this.redisClient.on('end', () => logger.info('client end!'))
    this.redisClient.on('error', (error) => logger.failure(`client error!`, error.message))
    // connect
    this.redisClient.connect()
  }

  onApplicationShutdown() {
    this.redisClient.disconnect().then(() => logger.log('readied (disconnected).'))
  }

  // https://github.com/redis/node-redis/blob/master/docs/client-configuration.md#reconnect-strategy
  private retryStrategy(retries: number): number | Error {
    const errorMessage = `retryStrategy! retries: ${retries}`
    logger.error(errorMessage)
    if (retries > 6) {
      return new Error('Redis maximum retries!')
    }
    return Math.min(retries * 1000, 3000)
  }

  // https://github.com/redis/node-redis/blob/master/docs/client-configuration.md
  private getOptions(): RedisClientOptions {
    const redisOptions: RedisClientOptions = {
      socket: {
        host: APP_CONFIG.REDIS.host,
        port: APP_CONFIG.REDIS.port as number,
        reconnectStrategy: this.retryStrategy.bind(this)
      }
    }
    if (APP_CONFIG.REDIS.username) {
      redisOptions.username = APP_CONFIG.REDIS.username
    }
    if (APP_CONFIG.REDIS.password) {
      redisOptions.password = APP_CONFIG.REDIS.password
    }

    return redisOptions
  }

  public get client(): RedisClientType {
    return this.redisClient
  }

  public get store(): RedisStore {
    return this.redisStore
  }
}
