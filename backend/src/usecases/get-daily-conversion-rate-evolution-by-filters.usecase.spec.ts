import { Test, TestingModule } from '@nestjs/testing';
import { ConversionRateService } from '@/infrastructure/services/conversion-rate.service';
import { CacheService } from '@/infrastructure/services/cache.service';
import { GetConversionRateEvolutionByFiltersUseCase } from '@/usecases/get-conversion-rate-evolution-by-filters.usecase';
import {
  ConversionRateQueryDto,
  Interval,
  Channel,
} from '@/shared/dtos/conversion-rate.dto';

describe('ConversionRateService', () => {
  let conversionRateService: ConversionRateService;
  let cacheService: CacheService;
  let getConversionRateEvolutionByFilters: GetConversionRateEvolutionByFiltersUseCase;

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockGetConversionRateEvolutionByFilters = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ConversionRateService,
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
        {
          provide: GetConversionRateEvolutionByFiltersUseCase,
          useValue: mockGetConversionRateEvolutionByFilters,
        },
      ],
    }).compile();

    conversionRateService = moduleRef.get<ConversionRateService>(
      ConversionRateService,
    );
    cacheService = moduleRef.get<CacheService>(CacheService);
    getConversionRateEvolutionByFilters =
      moduleRef.get<GetConversionRateEvolutionByFiltersUseCase>(
        GetConversionRateEvolutionByFiltersUseCase,
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached data if present and not call the use case', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.EMAIL,
      startDate: '2025-05-01',
      endDate: '2025-05-07',
      page: '1',
      limit: '10',
      interval: Interval.DAILY,
    };

    const cacheKey = `conv:${query.interval}:{channel}:${query.startDate}:${query.endDate}:${query.page}:${query.limit}`;
    const cachedResult = {
      data: [
        {
          channel: 'email',
          day: '2025-05-01',
          total_sends: '100',
          total_converts: '5',
          conversion_rate: '0.05',
        },
      ],
      pagination: { page: 1, limit: 10, totalItems: 1, totalPages: 1 },
    };
    mockCacheService.get.mockResolvedValue(cachedResult);

    const result =
      await conversionRateService.getConversionRateEvolution(query);

    expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
    expect(getConversionRateEvolutionByFilters.execute).not.toHaveBeenCalled();
    expect(result).toBe(cachedResult);
  });

  it('should fetch from use case, cache the result, and return the computed structure when no cache is found', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.MOBILE,
      startDate: '2025-04-01',
      endDate: '2025-04-30',
      page: '2',
      limit: '5',
      interval: Interval.WEEKLY,
    };
    const cacheKey = `conv:${query.interval}:{channel}:${query.startDate}:${query.endDate}:${query.page}:${query.limit}`;
    mockCacheService.get.mockResolvedValue(null);

    const sampleArray = [
      {
        week: '2025-W14',
        total_sends: '200',
        total_converts: '20',
        conversion_rate: '0.10',
      },
      {
        week: '2025-W15',
        total_sends: '220',
        total_converts: '25',
        conversion_rate: '0.114',
      },
      {
        week: '2025-W16',
        total_sends: '210',
        total_converts: '22',
        conversion_rate: '0.104',
      },
      {
        week: '2025-W17',
        total_sends: '230',
        total_converts: '30',
        conversion_rate: '0.130',
      },
      {
        week: '2025-W18',
        total_sends: '240',
        total_converts: '28',
        conversion_rate: '0.117',
      },
    ];
    mockGetConversionRateEvolutionByFilters.execute.mockResolvedValue(
      sampleArray,
    );

    const result =
      await conversionRateService.getConversionRateEvolution(query);

    const expectedPage = Number(query.page) || 1;
    const expectedLimit = Number(query.limit) || 10;
    const expectedTotalItems = sampleArray.length;
    const expectedTotalPages = Math.ceil(expectedTotalItems / expectedLimit);

    const expectedResult = {
      data: sampleArray,
      pagination: {
        page: expectedPage,
        limit: expectedLimit,
        totalItems: expectedTotalItems,
        totalPages: expectedTotalPages,
      },
    };

    expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
    expect(getConversionRateEvolutionByFilters.execute).toHaveBeenCalledWith(
      query,
    );
    expect(cacheService.set).toHaveBeenCalledWith(
      cacheKey,
      expectedResult,
      3600,
    );
    expect(result).toEqual(expectedResult);
  });
});
