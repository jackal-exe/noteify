import { JWT } from '@app/app.config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    JwtModule.register({
      secret: JWT.secret,
      signOptions: { expiresIn: '1d' }
    }),
    UserModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
