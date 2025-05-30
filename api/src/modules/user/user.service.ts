import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserRepository } from '../../repository/user.repository'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  private readonly saltRounds = 10

  async create(createUserDto: CreateUserDto) {
    const { password, ...others } = createUserDto
    const salt = await bcrypt.genSalt(this.saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await this.userRepository.create({
      ...others,
      password: hashedPassword
    })
    return { data: newUser, message: 'create user success' }
  }

  async findBy(email: string) {
    const user = await this.userRepository.findBy({ email })
    return { data: user, message: 'get user success' }
  }
}
