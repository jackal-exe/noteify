import { Injectable } from '@nestjs/common'
import { CacheService } from './config/cache/redis/cache.service'

@Injectable()
export class AppService {
  constructor(private readonly cacheService: CacheService) {}

  async getHello(word: string) {
    await this.cacheService.set('word', word, 3600)
    return { data: word, message: 'Get Hello Success' }
  }
}
