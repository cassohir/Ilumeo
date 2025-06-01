import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from '../cache.service';
import { encodeStringToBase64 } from '@/shared/utils/encode64';
import { Cache } from 'cache-manager';

describe('CacheService', () => {
  let cacheService: CacheService;
  let cacheManager: Cache;

  const mockCacheManager = {
    set: jest.fn(),
    del: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    cacheService = moduleRef.get<CacheService>(CacheService);
    cacheManager = moduleRef.get<Cache>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call cacheManager.set with the base64-encoded key, value, and ttl', async () => {
    const key = 'myKey';
    const value = { foo: 'bar' };
    const ttl = 3600;
    const encodedKey = encodeStringToBase64(key);

    await cacheService.set(key, value, ttl);

    expect(cacheManager.set).toHaveBeenCalledWith(encodedKey, value, ttl);
  });

  it('should call cacheManager.del with the base64-encoded key', async () => {
    const key = 'anotherKey';
    const encodedKey = encodeStringToBase64(key);

    await cacheService.delete(key);

    expect(cacheManager.del).toHaveBeenCalledWith(encodedKey);
  });

  it('should call cacheManager.get with the base64-encoded key and return its result', async () => {
    const key = 'testKey';
    const encodedKey = encodeStringToBase64(key);
    const cachedValue = 'cachedValue';

    (mockCacheManager.get as jest.Mock).mockResolvedValue(cachedValue);
    const result = await cacheService.get(key);

    expect(cacheManager.get).toHaveBeenCalledWith(encodedKey);
    expect(result).toBe(cachedValue);
  });
});
