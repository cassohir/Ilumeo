import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class AddRequestId implements NestMiddleware {
    use(request: Request, _: Response, next: NextFunction): void;
}
