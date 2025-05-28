import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async validateUser(body: AuthDto): Promise<any> {
		const { email, password } = body;
		const { data: user } = await this.userService.findBy(email);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		const decryptPassword = bcrypt.compareSync(password, user.password);
		if (decryptPassword) {
			delete user.password;
			return user;
		}
		throw new UnauthorizedException('Invalid credentials');
	}

	async login(user: any): Promise<any> {
		const accessToken = this.jwtService.sign({ id: user.id, role: user.role });
		const userWithToken = {
			...user,
			accessToken
		};
		return { data: userWithToken, message: 'login success' };
	}
}
