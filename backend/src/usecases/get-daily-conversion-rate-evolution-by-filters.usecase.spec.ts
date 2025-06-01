import { Test, TestingModule } from '@nestjs/testing';
import { GetConversionRateEvolutionByFiltersUseCase } from './get-conversion-rate-evolution-by-filters.usecase';
import { IDailyConversionRateViewRepository } from '@/domain/interfaces/daily-conversion-rate-view.interface';
import DailyConversionRateViewRepository from '@/infrastructure/repositories/daily-conversion-rate-view.repository';
import { Channel } from '@/shared/dtos/conversion-rate.dto';

describe('GetConversionRateEvolutionByFiltersUseCase', () => {
  let getConversionRateEvolutionUseCase: GetConversionRateEvolutionByFiltersUseCase;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let dailyConversionRateViewRepository: IDailyConversionRateViewRepository;

  const mockDailyConversionRateViewRepository = {
    getTemporalEvolutionConversionRateByChannel: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetConversionRateEvolutionByFiltersUseCase,
        {
          provide: DailyConversionRateViewRepository,
          useValue: mockDailyConversionRateViewRepository,
        },
      ],
    }).compile();

    getConversionRateEvolutionUseCase =
      moduleRef.get<GetConversionRateEvolutionByFiltersUseCase>(
        GetConversionRateEvolutionByFiltersUseCase,
      );

    dailyConversionRateViewRepository =
      moduleRef.get<IDailyConversionRateViewRepository>(
        DailyConversionRateViewRepository,
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call repository with provided limit, page, channel and date filters, and return the results', async () => {
    // Arrange
    const query = {
      limit: '20',
      page: '2',
      channel: Channel.EMAIL,
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    };
    const expectedLimit = 20;
    const expectedPage = 2;
    const expectedOffset = (expectedPage - 1) * expectedLimit;
    const sampleResult = {
      data: [
        {
          channel: 'email',
          day: '2025-01-01T00:00:00.000Z',
          total_sends: '45087',
          total_converts: '54',
          conversion_rate: '0.12',
        },
        // ...other items
      ],
      pagination: {
        page: 2,
        limit: 20,
        totalItems: 148,
        totalPages: 8,
      },
    };
    mockDailyConversionRateViewRepository.getTemporalEvolutionConversionRateByChannel.mockResolvedValue(
      sampleResult,
    );

    // Act
    const result = await getConversionRateEvolutionUseCase.execute(
      query as any,
    );

    // Assert
    expect(
      mockDailyConversionRateViewRepository.getTemporalEvolutionConversionRateByChannel,
    ).toHaveBeenCalledWith({
      limit: expectedLimit,
      offset: expectedOffset,
      channel: Channel.EMAIL,
      startDate: query.startDate,
      endDate: query.endDate,
    });
    expect(result).toEqual(sampleResult);
  });

  it('should use default limit=10 and page=1 (offset=0) when limit and page are not provided', async () => {
    // Arrange
    const query = {
      channel: Channel.WHATSAPP,
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      // limit and page omitted
    };
    const expectedLimit = 10;
    const expectedPage = 1;
    const expectedOffset = 0;
    const sampleResult = {
      data: [
        {
          channel: 'wpp',
          day: '2025-02-01T00:00:00.000Z',
          total_sends: '32000',
          total_converts: '40',
          conversion_rate: '0.125',
        },
      ],
      pagination: {
        page: expectedPage,
        limit: expectedLimit,
        totalItems: 50,
        totalPages: 5,
      },
    };
    mockDailyConversionRateViewRepository.getTemporalEvolutionConversionRateByChannel.mockResolvedValue(
      sampleResult,
    );

    // Act
    const result = await getConversionRateEvolutionUseCase.execute(
      query as any,
    );

    // Assert
    expect(
      mockDailyConversionRateViewRepository.getTemporalEvolutionConversionRateByChannel,
    ).toHaveBeenCalledWith({
      limit: expectedLimit,
      offset: expectedOffset,
      channel: Channel.WHATSAPP,
      startDate: query.startDate,
      endDate: query.endDate,
    });
    expect(result).toEqual(sampleResult);
  });

  it('should propagate errors thrown by the repository', async () => {
    // Arrange
    const query = {
      limit: '5',
      page: '1',
      channel: Channel.MOBILE,
      startDate: '2025-03-01',
      endDate: '2025-03-31',
    };
    const repositoryError = new Error('Database failure');
    mockDailyConversionRateViewRepository.getTemporalEvolutionConversionRateByChannel.mockRejectedValue(
      repositoryError,
    );

    // Act & Assert
    await expect(
      getConversionRateEvolutionUseCase.execute(query as any),
    ).rejects.toThrow(repositoryError);
    expect(
      mockDailyConversionRateViewRepository.getTemporalEvolutionConversionRateByChannel,
    ).toHaveBeenCalledWith({
      limit: 5,
      offset: 0,
      channel: Channel.MOBILE,
      startDate: query.startDate,
      endDate: query.endDate,
    });
  });
});
