import { DB_CONNECTION_TOKEN } from '@app/constants/db.constants'
import { camelCase, snakeCase } from '@app/utils/camel-case'
import { Inject } from '@nestjs/common'
import { Pool } from 'pg'
import { CreateTodoDto } from '../modules/todo/dto/create-todo.dto'
import { UpdateTodoDto } from '../modules/todo/dto/update-todo.dto'

export class TodoRepository {
  constructor(@Inject(DB_CONNECTION_TOKEN) private readonly pool: Pool) {}

  async create(todo: CreateTodoDto, userId: number) {
    const query =
      'INSERT INTO todo (title, description, deadline, task_type, subtasks, owner_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
    const res = await this.pool.query(query, [
      todo.title,
      todo.description,
      todo.deadline,
      todo.taskType,
      JSON.stringify(todo.subtasks),
      userId
    ])
    return camelCase(res.rows[0])
  }

  async find(userId: number) {
    const query = 'SELECT * FROM todo WHERE owner_id = $1'
    const res = await this.pool.query(query, [userId])
    return camelCase(res.rows)
  }

  async update(todoId: number, updatedTodo: UpdateTodoDto) {
    let query = 'UPDATE todo SET'
    const values: any[] = []
    let index = 1

    for (const [key, value] of Object.entries(snakeCase(updatedTodo))) {
      if (value !== undefined) {
        const parsedValues = key == 'subtasks' ? JSON.stringify(value) : value
        query += ` ${key} = $${index},`
        values.push(parsedValues)
        index++
      }
    }

    query += ' updated_at = current_timestamp,'
    query = query.slice(0, -1)
    query += ` WHERE id = $${index} RETURNING *`

    values.push(todoId)

    // Execute the query
    const res = await this.pool.query(query, values)
    return camelCase(res.rows[0])
  }

  async delete(todoId: number) {
    const query = 'DELETE FROM todo WHERE id = $1 RETURNING *'
    const res = await this.pool.query(query, [todoId])
    return camelCase(res.rows[0])
  }
}
