import { Test, TestingModule } from '@nestjs/testing'
import { RemindersController } from './reminder.controller'
import { RemindersService } from './reminder.service'

describe('RemindersController', () => {
  let controller: RemindersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemindersController],
      providers: [RemindersService]
    }).compile()

    controller = module.get<RemindersController>(RemindersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
