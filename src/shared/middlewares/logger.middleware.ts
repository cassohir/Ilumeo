import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('LOGGER');

  use(request: Request, _: Response, next: NextFunction) {
    this.logger.log(`${request.method.toUpperCase()} ${request.url}`, {
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
