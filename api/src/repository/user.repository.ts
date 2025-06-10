import { DB_CONNECTION_TOKEN } from '@app/constants/db.constants'
import { camelCase } from '@app/utils/camel-case'
import { Inject } from '@nestjs/common'
import { Pool } from 'pg'
import { CreateUserDto } from '../modules/user/dto/create-user.dto'

export class UserRepository {
  constructor(@Inject(DB_CONNECTION_TOKEN) private readonly pool: Pool) {}
  async create(user: CreateUserDto) {
    const query =
      'INSERT INTO "user" (username, password, email, phone_number, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, phone_number, role'
    const res = await this.pool.query(query, [user.username, user.password, user.email, user.phoneNumber, user.role])
    return camelCase(res.rows[0])
  }

  // no camel case (internal method only)
  async findBy(value: any) {
    const query = `SELECT * FROM "user" WHERE ${Object.keys(value)[0]} = $1`
    const res = await this.pool.query(query, [Object.values(value)[0]])
    return res.rows[0]
  }
}
