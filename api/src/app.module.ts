import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RedisModule } from './config/cache/redis/redis.module'
import { PgModule } from './config/database/postgres/pg.module'
import { AuthModule } from './modules/auth/auth.module'
import { RemindersModule } from './modules/reminder/reminder.module'
import { TodoModule } from './modules/todo/todo.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [PgModule, RedisModule, AuthModule, RemindersModule, UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
