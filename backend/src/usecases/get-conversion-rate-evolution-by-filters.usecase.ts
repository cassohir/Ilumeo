import { IDailyConversionRateViewRepository } from '@/domain/interfaces/daily-conversion-rate-view.interface';
import DailyConversionRateViewRepository from '@/infrastructure/repositories/daily-conversion-rate-view.repository';
import { UseCase } from '@/shared/base/usecase';
import { ConversionRateQueryDto } from '@/shared/dtos/conversion-rate.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetConversionRateEvolutionByFiltersUseCase
  implements UseCase<ConversionRateQueryDto, any>
{
  constructor(
    @Inject(DailyConversionRateViewRepository)
    private readonly dailyConversionRateRepository: IDailyConversionRateViewRepository,
  ) {}

  async execute(query: ConversionRateQueryDto) {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;

    const results =
      await this.dailyConversionRateRepository.getTemporalEvolutionConversionRateByChannel(
        {
          limit,
          offset: offset,
          channel: query.channel,
          endDate: query.endDate,
          startDate: query.startDate,
        },
      );
    return results;
  }
}
