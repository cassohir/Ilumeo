import { cache } from '../environment/schemas.config';
import { RedisStore, redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';

type RedisConfig = {
  store: (config: RedisClientOptions) => Promise<RedisStore>;
  socket: {
    host: string;
    port: number;
  };
  password?: string;
  username?: string;
};

const getRedisConfig = (configService: ConfigService) => {
  const url = configService.get<string>(cache.REDIS_URL);

  if (url) {
    return { store: redisStore, url };
  }

  const password = configService.get<string>(cache.PASSWORD);
  const username = configService.get<string>(cache.USER_NAME);

  const config: RedisConfig = {
    store: redisStore,
    socket: {
      host: configService.get<string>(cache.HOST) || 'redis-db',
      port: parseInt(configService.get<string>(cache.PORT)!, 10) || 6379,
    },
  };

  if (password && username) {
    config.password = password;
    config.username = username;
  }

  return config;
};

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return getRedisConfig(configService);
  },
  inject: [ConfigService],
};
