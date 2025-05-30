import { JWT } from '@app/app.config'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<any> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing')
    }

    const token = authHeader.split(' ')[1] // Extract token after 'Bearer'
    if (!token) {
      throw new UnauthorizedException('Invalid token format')
    }

    try {
      const decode = this.jwtService.verify(token, { secret: JWT.secret })
      request.user = decode
      return true
    } catch (error) {
      throw new UnauthorizedException('Invalid Token or Token Expires!')
    }
  }
}
