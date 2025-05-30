import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ReminderRepository } from '../../repository/reminder.repository'
import { RemindersController } from './reminder.controller'
import { RemindersService } from './reminder.service'

@Module({
  imports: [JwtModule],
  controllers: [RemindersController],
  providers: [RemindersService, ReminderRepository]
})
export class RemindersModule {}
