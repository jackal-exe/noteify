import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PgModule } from './config/database/postgres/pg.module';
import { RedisModule } from './config/cache/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { RemindersModule } from './modules/reminder/reminder.module';
import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		PgModule,
		RedisModule,
		AuthModule,
		RemindersModule,
		UserModule,
		TodoModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
