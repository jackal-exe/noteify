import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/user.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(body: AuthDto): Promise<any> {
    const { email, password } = body
    const { data: user } = await this.userService.findBy(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const decryptPassword = bcrypt.compareSync(password, user.password)
    if (decryptPassword) {
      delete user.password
      return user
    }
    throw new UnauthorizedException('Invalid credentials')
  }

  async login(user: any): Promise<any> {
    try {
      const accessToken = this.jwtService.sign({ id: user.id, role: user.role })
      const userWithToken = {
        ...user,
        accessToken
      }
      return { data: userWithToken, message: 'login success' }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
