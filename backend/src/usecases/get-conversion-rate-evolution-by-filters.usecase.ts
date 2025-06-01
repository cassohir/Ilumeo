import { IDailyConversionRateViewRepository } from '@/domain/interfaces/daily-conversion-rate-view.interface';
import { IMonthlyConversionRateViewRepository } from '@/domain/interfaces/monthly-conversion-rate.view.interface';
import { IWeeklyConversionRateViewRepository } from '@/domain/interfaces/weekly-conversion-rate.view.interface';
import DailyConversionRateViewRepository from '@/infrastructure/repositories/daily-conversion-rate-view.repository';
import MonthlyConversionRateViewRepository from '@/infrastructure/repositories/monthly-conversion-rate-view.repository';
import WeeklyConversionRateViewRepository from '@/infrastructure/repositories/weekly-conversion-rate-view.repository';
import { UseCase } from '@/shared/base/usecase';
import {
  ConversionRateQueryDto,
  Interval,
} from '@/shared/dtos/conversion-rate.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetConversionRateEvolutionByFiltersUseCase
  implements UseCase<ConversionRateQueryDto, any>
{
  constructor(
    @Inject(DailyConversionRateViewRepository)
    private readonly dailyConversionRateRepository: IDailyConversionRateViewRepository,

    @Inject(WeeklyConversionRateViewRepository)
    private readonly weeklyConversionRateRepository: IWeeklyConversionRateViewRepository,

    @Inject(MonthlyConversionRateViewRepository)
    private readonly monthlyConversionRateRepository: IMonthlyConversionRateViewRepository,
  ) {}

  async execute(query: ConversionRateQueryDto) {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;

    const data = {
      limit,
      offset: offset,
      channel: query.channel,
      endDate: query.endDate,
      startDate: query.startDate,
    };

    switch (query.interval) {
      case Interval.DAILY:
        return await this.dailyConversionRateRepository.getDailyEvolutionConversionRateByChannel(
          data,
        );
      case Interval.WEEKLY:
        return await this.weeklyConversionRateRepository.getWeeklyEvolutionConversionRateByChannel(
          data,
        );
      case Interval.MONTHLY:
        return await this.monthlyConversionRateRepository.getMonthlyEvolutionConversionRateByChannel(
          data,
        );
      default:
        return await this.dailyConversionRateRepository.getDailyEvolutionConversionRateByChannel(
          data,
        );
    }
  }
}
