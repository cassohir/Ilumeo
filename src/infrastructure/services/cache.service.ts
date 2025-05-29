import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { encodeStringToBase64 } from '@/shared/utils/encode64';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async set(key: string, value: any, ttl: number) {
    await this.cacheManager.del(encodeStringToBase64(key));
    await this.cacheManager.set(encodeStringToBase64(key), value, ttl);
  }
  async delete(key: string) {
    await this.cacheManager.del(encodeStringToBase64(key));
  }
  async get(key: string) {
    return this.cacheManager.get(encodeStringToBase64(key));
  }
}
