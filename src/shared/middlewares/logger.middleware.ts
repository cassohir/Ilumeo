import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from '@/infrastructure/logger/logger.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, _: Response, next: NextFunction) {
    logger.info(`${request.method.toUpperCase()} ${request.url}`, {
      request: {
        id: request.id,
        method: request.method,
        url: request.url,
        params: request.params,
        query: request.query,
        body: request.body,
      },
    });
    next();
  }
}
