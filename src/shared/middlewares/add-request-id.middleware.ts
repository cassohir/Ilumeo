import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { genId } from '../utils/genId';

@Injectable()
export class AddRequestId implements NestMiddleware {
  use(request: Request, _: Response, next: NextFunction) {
    if (request.id) return;

    const existingRequestId = request.header('X-Request-Id');
    const newId = genId();
    if (!existingRequestId) request.headers['X-Request-Id'] = newId;
    request.id = existingRequestId || newId;

    return next();
  }
}
