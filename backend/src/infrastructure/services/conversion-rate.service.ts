import {
  ConversionRateQueryDto,
  Interval,
} from '@/shared/dtos/conversion-rate.dto';
import { GetConversionRateEvolutionByFiltersUseCase } from '@/usecases/get-conversion-rate-evolution-by-filters.usecase';
import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.service';

@Injectable()
export class ConversionRateService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly getDailyConversionRateEvolutionByFilters: GetConversionRateEvolutionByFiltersUseCase,
  ) {}
  async getConversionRateEvolution(query: ConversionRateQueryDto) {
    const { channel, startDate, endDate, page, limit, interval } = query;
    const cacheKey = `conv:${interval}:{channel}:${startDate}:${endDate}:${page}:${limit}`;

    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    switch (interval) {
      case Interval.DAILY:
    }

    const conversionRateEvolutionRate =
      await this.getDailyConversionRateEvolutionByFilters.execute(query);

    const result = {
      data: conversionRateEvolutionRate,
      pagination: {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        totalItems: conversionRateEvolutionRate.length,
        totalPages: Math.ceil(
          conversionRateEvolutionRate.length / Number(limit),
        ),
      },
    };

    this.cacheService.set(cacheKey, result, 60 * 60);
    return result;
  }
}
