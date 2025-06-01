"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisOptions = void 0;
const schemas_config_1 = require("../environment/schemas.config");
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
const config_1 = require("@nestjs/config");
const getRedisConfig = (configService) => {
    const url = configService.get(schemas_config_1.cache.REDIS_URL);
    if (url) {
        console.log(`Using Redis URL: ${url}`);
        return { store: cache_manager_redis_store_1.redisStore, url };
    }
    const password = configService.get(schemas_config_1.cache.PASSWORD);
    const username = configService.get(schemas_config_1.cache.USER_NAME);
    const config = {
        store: cache_manager_redis_store_1.redisStore,
        socket: {
            host: configService.get(schemas_config_1.cache.HOST) || 'redis-db',
            port: parseInt(configService.get(schemas_config_1.cache.PORT), 10) || 6379,
        },
    };
    if (password && username) {
        config.password = password;
        config.username = username;
    }
    return config;
};
exports.RedisOptions = {
    isGlobal: true,
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => {
        return getRedisConfig(configService);
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=redis.config.js.map