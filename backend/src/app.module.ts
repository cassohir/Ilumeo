import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeormModule } from './infrastructure/config/typeorm/typeorm.module';
import { AppController } from './app.controller';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModules } from './infrastructure/modules.module';
import { AddRequestId } from './shared/middlewares/add-request-id.middleware';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisOptions } from './infrastructure/config/database/redis.config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env/.env',
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync(RedisOptions),
    TypeormModule,
    ...AppModules,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddRequestId).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
