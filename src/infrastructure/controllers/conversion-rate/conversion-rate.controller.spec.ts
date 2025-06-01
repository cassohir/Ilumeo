import { Test, TestingModule } from '@nestjs/testing';
import { ConversionRateController } from './conversion-rate.controller';
import { ConversionRateService } from '@/infrastructure/services/conversion-rate.service';
import {
  Channel,
  ConversionRateQueryDto,
} from '@/shared/dtos/conversion-rate.dto';

describe('ConversionRateController', () => {
  let controller: ConversionRateController;
  let service: ConversionRateService;

  const mockConversionRateService = {
    getConversionRateEvolution: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversionRateController],
      providers: [
        {
          provide: ConversionRateService,
          useValue: mockConversionRateService,
        },
      ],
    }).compile();

    controller = module.get<ConversionRateController>(ConversionRateController);
    service = module.get<ConversionRateService>(ConversionRateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ConversionRateService.getConversionRateEvolution with the provided query and return its result', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.WHATSAPP,
      startDate: '2025-06-01',
      endDate: '2025-06-30',
      page: '1',
      limit: '10',
    };
    const expectedResponse = {
      data: [
        {
          channel: 'email',
          day: '2025-06-01',
          total_sends: '100',
          total_converts: '5',
          conversion_rate: '0.05',
        },
      ],
      pagination: { page: 1, limit: 10, totalItems: 1, totalPages: 1 },
    };
    mockConversionRateService.getConversionRateEvolution.mockResolvedValue(
      expectedResponse,
    );

    const result = await controller.getConversionRateEvolution(query);

    expect(service.getConversionRateEvolution).toHaveBeenCalledWith(query);
    expect(result).toEqual(expectedResponse);
  });

  it('should propagate errors thrown by the service', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.EMAIL,
      startDate: '2025-05-01',
      endDate: '2025-05-07',
      page: '2',
      limit: '5',
    };
    const serviceError = new Error('Service failure');
    mockConversionRateService.getConversionRateEvolution.mockRejectedValue(
      serviceError,
    );

    await expect(controller.getConversionRateEvolution(query)).rejects.toThrow(
      serviceError,
    );
    expect(service.getConversionRateEvolution).toHaveBeenCalledWith(query);
  });
});
