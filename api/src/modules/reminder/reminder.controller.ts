import { Role } from '@app/constants/role.constants'
import { Roles } from '@app/decorators/role.decorator'
import { JwtAuthGuard } from '@app/guards/jwt.auth.guards'
import { RoleGuards } from '@app/guards/role.guards'
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { CreateReminderDto } from './dto/create-reminder.dto'
import { UpdateReminderDto } from './dto/update-reminder.dto'
import { RemindersService } from './reminder.service'

@Controller('reminder')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @UseGuards(JwtAuthGuard, RoleGuards)
  @Roles(Role.User)
  @Post()
  create(@Body() createReminderDto: CreateReminderDto, @Request() req: any) {
    const userId = req.user.id
    return this.remindersService.create(createReminderDto, userId)
  }

  @UseGuards(JwtAuthGuard, RoleGuards)
  @Roles(Role.User)
  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.id
    return this.remindersService.findAll(userId)
  }

  @UseGuards(JwtAuthGuard, RoleGuards)
  @Roles(Role.User)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReminderDto: UpdateReminderDto) {
    return this.remindersService.update(id, updateReminderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.remindersService.remove(id)
  }
}
