import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AddRequestId } from './add-request-id.middleware';

describe('AddRequestId Middleware', () => {
  let app: INestApplication;
  let middleware: NestMiddleware;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AddRequestId],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    middleware = app.get<AddRequestId>(AddRequestId);
  });

  it('should use the existing request ID if present in headers', () => {
    const mockRequest = {
      headers: { 'x-request-id': 'existing-id' },
      header: jest.fn().mockReturnValue('existing-id'),
    } as unknown as Request;
    const mockResponse = {} as Response;
    const mockNext = jest.fn() as NextFunction;

    middleware.use(mockRequest, mockResponse, mockNext);

    expect(mockRequest.headers['x-request-id']).toBe('existing-id');
    expect(mockRequest.id).toBe('existing-id');
    expect(mockNext).toHaveBeenCalled();
  });

  afterAll(async () => {
    await app.close();
  });
});
