import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService]
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	describe('root', () => {
		it('should be defined', () => {
			expect(service.validateUser).toBe({});
		});
	});
});
