import { Global, Module } from '@nestjs/common'
import { databaseProvider, PgConnectProvider } from './pg.service'

@Global()
@Module({
  providers: [PgConnectProvider, databaseProvider],
  exports: [databaseProvider]
})
export class PgModule {}
