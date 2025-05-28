import { CacheService } from './cache.service';
import { RedisService } from './redis.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
	providers: [CacheService, RedisService],
	exports: [CacheService, RedisService]
})
export class RedisModule {}
