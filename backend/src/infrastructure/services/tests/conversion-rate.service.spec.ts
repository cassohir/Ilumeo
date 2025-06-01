import { Test, TestingModule } from '@nestjs/testing';

import { GetConversionRateEvolutionByFiltersUseCase } from '@/usecases/get-conversion-rate-evolution-by-filters.usecase';
import {
  Channel,
  ConversionRateQueryDto,
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

  it('should return cached data if present and not call the use case', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.EMAIL,
      startDate: '2025-05-01',
      endDate: '2025-05-07',
      page: '1',
      limit: '10',
    };
    const cacheKey = `conv:${query.channel}:${query.startDate}:${query.endDate}:${query.page}:${query.limit}`;
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

    // Act
    const result =
      await conversionRateService.getConversionRateEvolution(query);

    // Assert
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
    };
    const cacheKey = `conv:${query.channel}:${query.startDate}:${query.endDate}:${query.page}:${query.limit}`;
    mockCacheService.get.mockResolvedValue(null);

    const sampleArray = [
      {
        channel: Channel.EMAIL,
        day: '2025-04-01',
        total_sends: '50',
        total_converts: '2',
        conversion_rate: '0.04',
      },
      {
        channel: Channel.EMAIL,
        day: '2025-04-02',
        total_sends: '60',
        total_converts: '3',
        conversion_rate: '0.05',
      },
      {
        channel: Channel.EMAIL,
        day: '2025-04-03',
        total_sends: '55',
        total_converts: '1',
        conversion_rate: '0.018',
      },
      {
        channel: Channel.EMAIL,
        day: '2025-04-04',
        total_sends: '65',
        total_converts: '4',
        conversion_rate: '0.061',
      },
      {
        channel: Channel.EMAIL,
        day: '2025-04-05',
        total_sends: '70',
        total_converts: '5',
        conversion_rate: '0.071',
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

    // Assert
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

  it('should handle missing page and limit by using defaults (page=1, limit=10)', async () => {
    const query: Partial<ConversionRateQueryDto> = {
      channel: Channel.WHATSAPP,
      startDate: '2025-03-01',
      endDate: '2025-03-15',
    };
    const normalizedQuery = {
      channel: query.channel,
      startDate: query.startDate,
      endDate: query.endDate,
      page: '1',
      limit: '10',
    } as ConversionRateQueryDto;

    const cacheKey = `conv:${normalizedQuery.channel}:${normalizedQuery.startDate}:${normalizedQuery.endDate}:${normalizedQuery.page}:${normalizedQuery.limit}`;
    mockCacheService.get.mockResolvedValue(null);

    const sampleArray = [
      {
        channel: Channel.WHATSAPP,
        day: '2025-03-01',
        total_sends: '80',
        total_converts: '10',
        conversion_rate: '0.125',
      },
      {
        channel: Channel.WHATSAPP,
        day: '2025-03-02',
        total_sends: '90',
        total_converts: '9',
        conversion_rate: '0.1',
      },
    ];
    mockGetConversionRateEvolutionByFilters.execute.mockResolvedValue(
      sampleArray,
    );

    const result =
      await conversionRateService.getConversionRateEvolution(normalizedQuery);

    const expectedPage = 1;
    const expectedLimit = 10;
    const expectedTotalItems = sampleArray.length;

    console.log('TESTE:', Math.ceil(expectedTotalItems / expectedLimit));
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
      normalizedQuery,
    );
    expect(cacheService.set).toHaveBeenCalledWith(
      cacheKey,
      expectedResult,
      3600,
    );
    expect(result).toEqual(expectedResult);
  });
});
