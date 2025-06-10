import { Controller, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Request() req: any): Promise<any> {
    const user = await this.authService.validateUser(req.body)
    return this.authService.login(user)
  }
}
