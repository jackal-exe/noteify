import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from '../../repository/todo.repository';

@Module({
	imports: [JwtModule],
	controllers: [TodoController],
	providers: [TodoService, TodoRepository]
})
export class TodoModule {}
