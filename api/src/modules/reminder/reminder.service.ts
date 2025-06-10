import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ReminderRepository } from '../../repository/reminder.repository'
import { CreateReminderDto } from './dto/create-reminder.dto'
import { UpdateReminderDto } from './dto/update-reminder.dto'

@Injectable()
export class RemindersService {
  constructor(private readonly reminderRepository: ReminderRepository) {}

  async create(createReminderDto: CreateReminderDto, userId: number) {
    const reminder = await this.reminderRepository.create(createReminderDto, userId)
    return { data: reminder, message: 'create reminder success' }
  }

  async findAll(userId: number) {
    const reminders = await this.reminderRepository.find(userId)
    return { data: reminders, message: 'get reminders success' }
  }

  async update(reminderId: number, updateReminderDto: UpdateReminderDto) {
    const result = await this.reminderRepository.update(reminderId, updateReminderDto)
    if (result.affected === 0) throw new NotFoundException(`Reminder with ID ${reminderId} not found`)
    return { data: result, message: 'update reminder success' }
  }

  async remove(reminderId: number) {
    if (!reminderId) throw new BadRequestException('Reminder Id is required!')
    await this.reminderRepository.delete(reminderId)
    return { data: null, message: 'delete reminder success' }
  }
}
