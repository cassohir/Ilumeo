import logger from '@/infrastructure/logger/logger.config';
import { LoggerMiddleware } from './logger.middleware';
import { Request, Response, NextFunction } from 'express';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    mockRequest = {
      id: '12345',
      method: 'GET',
      url: '/test',
      params: { param1: 'value1' },
      query: { query1: 'value1' },
      body: { key: 'value' },
    };
    mockResponse = {};
    mockNext = jest.fn();
    jest.spyOn(logger, 'info').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log the request details and call next()', () => {
    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    expect(logger.info).toHaveBeenCalledWith(
      `${mockRequest.method.toUpperCase()} ${mockRequest.url}`,
      {
        request: {
          id: mockRequest.id,
          method: mockRequest.method,
          url: mockRequest.url,
          params: mockRequest.params,
          query: mockRequest.query,
          body: mockRequest.body,
        },
      },
    );

    expect(mockNext).toHaveBeenCalled();
  });
});
