// /src/services/conversion-rate.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';

import { GetConversionRateEvolutionByFiltersUseCase } from '@/usecases/get-conversion-rate-evolution-by-filters.usecase';
import {
  Channel,
  ConversionRateQueryDto,
  Interval,
} from '@/shared/dtos/conversion-rate.dto';
import { ConversionRateService } from '../conversion-rate.service';
import { CacheService } from '../cache.service';

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

  it('should return cached result when cacheService.get resolves a value', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.EMAIL,
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      interval: Interval.DAILY,
      page: '1',
      limit: '10',
    };
    const cacheKey = `conv:daily:email:2025-05-01:2025-05-31:1:10`;
    const cachedValue = {
      data: [
        {
          channel: 'email',
          day: '2025-05-01T00:00:00.000Z',
          totalSends: 100,
          totalConverts: 10,
          conversionRate: 10.0,
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        totalItems: 1,
        totalPages: 1,
      },
    };

    mockCacheService.get.mockResolvedValueOnce(cachedValue);

    const result =
      await conversionRateService.getConversionRateEvolution(query);

    expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
    expect(getConversionRateEvolutionByFilters.execute).not.toHaveBeenCalled();
    expect(cacheService.set).not.toHaveBeenCalled();
    expect(result).toBe(cachedValue);
  });

  it('should call use-case and set cache when cacheService.get returns null', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.WHATSAPP,
      startDate: '2025-04-01',
      endDate: '2025-04-15',
      interval: Interval.DAILY,
      page: '2',
      limit: '5',
    };
    const cacheKey = `conv:daily:wpp:2025-04-01:2025-04-15:2:5`;

    mockCacheService.get.mockResolvedValueOnce(null);

    const dummyData = [
      {
        channel: 'wpp',
        day: '2025-04-01T00:00:00.000Z',
        totalSends: 200,
        totalConverts: 20,
        conversionRate: 10.0,
      },
      {
        channel: 'wpp',
        day: '2025-04-02T00:00:00.000Z',
        totalSends: 250,
        totalConverts: 25,
        conversionRate: 10.0,
      },
    ];
    mockGetConversionRateEvolutionByFilters.execute.mockResolvedValueOnce(
      dummyData,
    );

    const result =
      await conversionRateService.getConversionRateEvolution(query);

    expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
    expect(getConversionRateEvolutionByFilters.execute).toHaveBeenCalledWith(
      query,
    );

    const expected = {
      data: dummyData,
      pagination: {
        page: 2,
        limit: 5,
        totalItems: 2,
        totalPages: 1,
      },
    };
    expect(result).toEqual(expected);
    expect(cacheService.set).toHaveBeenCalledWith(cacheKey, expected, 60 * 60);
  });

  it('should always use the daily use-case regardless of interval value', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.ALL,
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      interval: Interval.WEEKLY,
      page: '1',
      limit: '3',
    };
    const cacheKey = `conv:weekly:all:2025-02-01:2025-02-28:1:3`;

    mockCacheService.get.mockResolvedValueOnce(null);

    const dummyData = [
      {
        channel: 'all',
        day: '2025-02-01T00:00:00.000Z',
        totalSends: 300,
        totalConverts: 30,
        conversionRate: 10.0,
      },
    ];
    mockGetConversionRateEvolutionByFilters.execute.mockResolvedValueOnce(
      dummyData,
    );

    const result =
      await conversionRateService.getConversionRateEvolution(query);

    expect(cacheService.get).toHaveBeenCalledWith(cacheKey);
    expect(getConversionRateEvolutionByFilters.execute).toHaveBeenCalledWith(
      query,
    );

    const expected = {
      data: dummyData,
      pagination: {
        page: 1,
        limit: 3,
        totalItems: 1,
        totalPages: 1,
      },
    };
    expect(result).toEqual(expected);
    expect(cacheService.set).toHaveBeenCalledWith(cacheKey, expected, 60 * 60);
  });
});
