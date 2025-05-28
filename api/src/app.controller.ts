import { AppService } from './app.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(@Query('word') word: string) {
		return this.appService.getHello(word);
	}
}
