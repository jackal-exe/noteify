import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RemindersService } from './reminder.service';
import { RemindersController } from './reminder.controller';
import { ReminderRepository } from '../../repository/reminder.repository';

@Module({
	imports: [JwtModule],
	controllers: [RemindersController],
	providers: [RemindersService, ReminderRepository]
})
export class RemindersModule {}
