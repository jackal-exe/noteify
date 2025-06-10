import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { TodoRepository } from '../../repository/todo.repository'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(createTodoDto: CreateTodoDto, userId: number): Promise<any> {
    const todo = this.todoRepository.create(createTodoDto, userId)
    return { data: todo, message: 'create todo success' }
  }

  async findAll(userId: number): Promise<any> {
    const todos = await this.todoRepository.find(userId)
    if (!todos || todos.length === 0) {
      throw new NotFoundException('Task not found or empty.')
    }
    return { data: todos, message: 'get todos success' }
  }

  async update(todoId: number, updateTodoDto: UpdateTodoDto): Promise<any> {
    const result = await this.todoRepository.update(todoId, updateTodoDto)
    return { data: result, message: 'update todo success' }
  }

  async remove(todoId: number): Promise<any> {
    if (!todoId) throw new BadRequestException('Id is required!')
    await this.todoRepository.delete(todoId)
    return { data: null, message: 'delete todo success' }
  }

  async getAdminData(): Promise<string> {
    return 'hello admin!'
  }
}
