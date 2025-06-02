import { Test, TestingModule } from '@nestjs/testing';
import { GetConversionRateEvolutionByFiltersUseCase } from '@/usecases/get-conversion-rate-evolution-by-filters.usecase';
import {
  ConversionRateQueryDto,
  Interval,
  Channel,
} from '@/shared/dtos/conversion-rate.dto';
import DailyConversionRateViewRepository from '@/infrastructure/repositories/daily-conversion-rate-view.repository';
import WeeklyConversionRateViewRepository from '@/infrastructure/repositories/weekly-conversion-rate-view.repository';
import MonthlyConversionRateViewRepository from '@/infrastructure/repositories/monthly-conversion-rate-view.repository';

describe('GetConversionRateEvolutionByFiltersUseCase', () => {
  let useCase: GetConversionRateEvolutionByFiltersUseCase;

  const mockDailyRepo = {
    getDailyEvolutionConversionRateByChannel: jest.fn(),
  };
  const mockWeeklyRepo = {
    getWeeklyEvolutionConversionRateByChannel: jest.fn(),
  };
  const mockMonthlyRepo = {
    getMonthlyEvolutionConversionRateByChannel: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetConversionRateEvolutionByFiltersUseCase,
        {
          provide: DailyConversionRateViewRepository,
          useValue: mockDailyRepo,
        },
        {
          provide: WeeklyConversionRateViewRepository,
          useValue: mockWeeklyRepo,
        },
        {
          provide: MonthlyConversionRateViewRepository,
          useValue: mockMonthlyRepo,
        },
      ],
    }).compile();

    useCase = module.get<GetConversionRateEvolutionByFiltersUseCase>(
      GetConversionRateEvolutionByFiltersUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call daily repository when interval is DAILY', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.EMAIL,
      startDate: '2025-01-01',
      endDate: '2025-01-10',
      interval: Interval.DAILY,
      page: '2',
      limit: '5',
    };

    const dummyDailyResult = [
      {
        channel: 'email',
        day: '2025-01-01T00:00:00.000Z',
        totalSends: 100,
        totalConverts: 10,
        conversionRate: 10.0,
      },
    ];
    mockDailyRepo.getDailyEvolutionConversionRateByChannel.mockResolvedValueOnce(
      dummyDailyResult,
    );

    const result = await useCase.execute(query);

    const expectedLimit = 5;
    const expectedPage = 2;
    const expectedOffset = (expectedPage - 1) * expectedLimit; // 5

    expect(
      mockDailyRepo.getDailyEvolutionConversionRateByChannel,
    ).toHaveBeenCalledWith({
      limit: expectedLimit,
      offset: expectedOffset,
      channel: Channel.EMAIL,
      endDate: '2025-01-10',
      startDate: '2025-01-01',
    });

    // The return value should match dummyDailyResult    expect(result).toBe(dummyDailyResult);
  });

  it('should call weekly repository when interval is WEEKLY', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.WHATSAPP,
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      interval: Interval.WEEKLY,
      page: '1',
      limit: '3',
    };

    const dummyWeeklyResult = [
      {
        channel: 'wpp',
        week: '2025-W05',
        totalSends: 200,
        totalConverts: 20,
        conversionRate: 10.0,
      },
    ];
    mockWeeklyRepo.getWeeklyEvolutionConversionRateByChannel.mockResolvedValueOnce(
      dummyWeeklyResult,
    );

    const result = await useCase.execute(query);

    const expectedLimit = 3;
    const expectedPage = 1;
    const expectedOffset = (expectedPage - 1) * expectedLimit; // 0

    expect(
      mockWeeklyRepo.getWeeklyEvolutionConversionRateByChannel,
    ).toHaveBeenCalledWith({
      limit: expectedLimit,
      offset: expectedOffset,
      channel: Channel.WHATSAPP,
      endDate: '2025-02-28',
      startDate: '2025-02-01',
    });

    expect(result).toBe(dummyWeeklyResult);
  });

  it('should call monthly repository when interval is MONTHLY', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.MOBILE,
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      interval: Interval.MONTHLY,
      page: '3',
      limit: '2',
    };

    const dummyMonthlyResult = [
      {
        channel: 'MOBILE',
        month: '2025-03',
        totalSends: 150,
        totalConverts: 15,
        conversionRate: 10.0,
      },
    ];
    mockMonthlyRepo.getMonthlyEvolutionConversionRateByChannel.mockResolvedValueOnce(
      dummyMonthlyResult,
    );

    const result = await useCase.execute(query);

    const expectedLimit = 2;
    const expectedPage = 3;
    const expectedOffset = (expectedPage - 1) * expectedLimit; // 4

    expect(
      mockMonthlyRepo.getMonthlyEvolutionConversionRateByChannel,
    ).toHaveBeenCalledWith({
      limit: expectedLimit,
      offset: expectedOffset,
      channel: Channel.MOBILE,
      endDate: '2025-03-31',
      startDate: '2025-03-01',
    });

    expect(result).toBe(dummyMonthlyResult);
  });

  it('should default to daily repository when interval is undefined', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.ALL,
      startDate: '2025-04-01',
      endDate: '2025-04-30',
      page: '1',
      limit: '4',
    };

    const dummyDailyResult = [
      {
        channel: 'all',
        day: '2025-04-01T00:00:00.000Z',
        totalSends: 300,
        totalConverts: 30,
        conversionRate: 10.0,
      },
    ];
    mockDailyRepo.getDailyEvolutionConversionRateByChannel.mockResolvedValueOnce(
      dummyDailyResult,
    );

    const result = await useCase.execute(query);

    const expectedLimit = 4;
    const expectedPage = 1;
    const expectedOffset = (expectedPage - 1) * expectedLimit; // 0

    expect(
      mockDailyRepo.getDailyEvolutionConversionRateByChannel,
    ).toHaveBeenCalledWith({
      limit: expectedLimit,
      offset: expectedOffset,
      channel: Channel.ALL,
      endDate: '2025-04-30',
      startDate: '2025-04-01',
    });

    expect(result).toBe(dummyDailyResult);
  });

  it('should default page to 1 and limit to 10 if they are invalid or missing', async () => {
    const query: ConversionRateQueryDto = {
      channel: Channel.EMAIL,
      startDate: '2025-05-01',
      endDate: '2025-05-15',
      interval: Interval.DAILY,
      page: 'not-a-number',
      limit: undefined,
    };

    const dummyDailyResult = [
      {
        channel: 'email',
        day: '2025-05-01T00:00:00.000Z',
        totalSends: 120,
        totalConverts: 12,
        conversionRate: 10.0,
      },
    ];
    mockDailyRepo.getDailyEvolutionConversionRateByChannel.mockResolvedValueOnce(
      dummyDailyResult,
    );

    const result = await useCase.execute(query as any);

    const expectedLimit = 10;
    const expectedPage = 1;
    const expectedOffset = (expectedPage - 1) * expectedLimit; // 0

    expect(
      mockDailyRepo.getDailyEvolutionConversionRateByChannel,
    ).toHaveBeenCalledWith({
      limit: expectedLimit,
      offset: expectedOffset,
      channel: Channel.EMAIL,
      endDate: '2025-05-15',
      startDate: '2025-05-01',
    });

    expect(result).toBe(dummyDailyResult);
  });
});
