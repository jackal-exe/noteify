import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

type Subtask = {
  title: string
  done: boolean
}

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  deadline: Date

  @IsString()
  @IsNotEmpty()
  taskType: string

  @IsArray()
  @IsOptional()
  subtasks: Subtask[]

  @IsBoolean()
  @IsOptional()
  done: boolean
}
