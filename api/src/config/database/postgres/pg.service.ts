import { POSTGRES } from '@app/app.config'
import { DB_CONNECTION_TOKEN } from '@app/constants/db.constants'
import { createLogger } from '@app/utils/logger'
import { OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common'
import { Pool } from 'pg'

const logger = createLogger({ scope: 'PostgresqlService', time: true })

export class PgConnectProvider implements OnApplicationBootstrap, OnModuleDestroy {
  constructor(private readonly pool: Pool) {
    this.pool = new Pool({
      user: POSTGRES.username,
      password: POSTGRES.password,
      host: POSTGRES.host,
      database: POSTGRES.database
    })
  }

  async onApplicationBootstrap() {
    const client = await this.pool.connect()
    await client.query('SELECT 1')
    process.nextTick(() => logger.info('Postgres client connected.'))
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
