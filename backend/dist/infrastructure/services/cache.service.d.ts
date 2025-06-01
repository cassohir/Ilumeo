import { Cache } from 'cache-manager';
export declare class CacheService {
    private readonly cacheManager;
    constructor(cacheManager: Cache);
    set(key: string, value: any, ttl: number): Promise<void>;
    delete(key: string): Promise<void>;
    get(key: string): Promise<unknown>;
}
