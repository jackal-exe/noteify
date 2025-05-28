import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JWT } from '@app/app.config';

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
