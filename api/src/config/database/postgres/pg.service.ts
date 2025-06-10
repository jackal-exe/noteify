import { POSTGRES } from '@app/app.config'
import { DB_CONNECTION_TOKEN } from '@app/constants/db.constants'
import { createLogger } from '@app/utils/logger'
import { OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common'
import { Pool } from 'pg'

const logger = createLogger({ scope: 'PostgresqlService', time: true })

const MAX_RETRIES = 5
const RETRY_DELAY_MS = 2000

export class PgConnectProvider implements OnApplicationBootstrap, OnModuleDestroy {
  private readonly pool: Pool

  constructor() {
    this.pool = new Pool({
      host: POSTGRES.host,
      port: POSTGRES.port as number,
      user: POSTGRES.username,
      password: POSTGRES.password,
      database: POSTGRES.database
    })
  }

  async onApplicationBootstrap() {
    let retries = 0

    while (retries < MAX_RETRIES) {
      try {
        const client = await this.pool.connect()
        await client.query('SELECT 1')
        client.release()
        logger.info('Postgres client connected.')
        return
      } catch (err) {
        retries++
        logger.error(`Postgres connection failed (attempt ${retries}/${MAX_RETRIES}): ${err.message}`)
        if (retries >= MAX_RETRIES) {
          logger.error('Max retries reached. Could not connect to Postgres.')
          throw err
        }
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
      }
    }
  }

  async onModuleDestroy() {
    await this.pool.end()
    process.nextTick(() => logger.info('Disconnected from postgres client.'))
  }

  getConnection() {
    return this.pool
  }
}

export const databaseProvider = {
  inject: [PgConnectProvider],
  provide: DB_CONNECTION_TOKEN,
  useFactory(PgConnectProvider: PgConnectProvider) {
    return PgConnectProvider.getConnection()
  }
}
