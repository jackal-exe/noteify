import { DB_CONNECTION_TOKEN } from '@app/constants/db.constants'
import { camelCase } from '@app/utils/camel-case'
import { Inject } from '@nestjs/common'
import { Pool } from 'pg'
import { CreateReminderDto } from '../modules/reminder/dto/create-reminder.dto'
import { UpdateReminderDto } from '../modules/reminder/dto/update-reminder.dto'

export class ReminderRepository {
  constructor(@Inject(DB_CONNECTION_TOKEN) private readonly pool: Pool) {}
  async create(todo: CreateReminderDto, userId: number) {
    const query = 'INSERT INTO reminder (title, note, owner_id) VALUES ($1, $2, $3) RETURNING *'
    const res = await this.pool.query(query, [todo.title, todo.note, userId])
    return camelCase(res.rows[0])
  }
  async find(userId: number) {
    const query = 'SELECT * FROM reminder WHERE owner_id = $1'
    const res = await this.pool.query(query, [userId])
    return camelCase(res.rows)
  }
  async update(reminderId: number, updatedTodo: UpdateReminderDto) {
    const query = 'UPDATE reminder SET title = $1, note = $2 WHERE id = $3 RETURNING *'
    const res = await this.pool.query(query, [updatedTodo.title, updatedTodo.note, reminderId])
    return camelCase(res.rows[0])
  }

  async delete(reminderId: number) {
    const query = 'DELETE FROM reminder WHERE id = $1 RETURNING *'
    const res = await this.pool.query(query, [reminderId])
    return camelCase(res.rows[0])
  }
}
