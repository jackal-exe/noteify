import { IsNotEmpty, IsString } from 'class-validator'

export class CreateReminderDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  note: string
}
