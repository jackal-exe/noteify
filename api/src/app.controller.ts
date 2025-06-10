import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('word') word: string) {
    return this.appService.getHello(word)
  }
}
