import { Role } from '@app/constants/role.constants'
import { ROLES_KEY } from '@app/decorators/role.decorator'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuards implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    const { user } = context.switchToHttp().getRequest()
    const isAdmin = requiredRoles.some((role) => role == user.role)

    if (!isAdmin) {
      throw new UnauthorizedException('You are not allowed to access data!')
    }

    return true
  }
}
