import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TodoRepository } from '../../repository/todo.repository'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'

@Module({
  imports: [JwtModule],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository]
})
export class TodoModule {}
