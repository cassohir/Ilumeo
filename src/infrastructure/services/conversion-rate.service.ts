import { ConversionRateQueryDto } from '@/shared/dtos/conversion-rate.dto';
import { GetConversionRateEvolutionByFiltersUseCase } from '@/usecases/get-conversion-rate-evolution-by-filters.usecase';
import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.service';

@Injectable()
export class ConversionRateService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly getConversionRateEvolutionByFilters: GetConversionRateEvolutionByFiltersUseCase,
  ) {}
  async getConversionRateEvolution(query: ConversionRateQueryDto) {
    const { channel, startDate, endDate, page, limit } = query;
    const cacheKey = `conv:${channel}:${startDate}:${endDate}:${page}:${limit}`;

    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const conversionRateEvolutionRate =
      await this.getConversionRateEvolutionByFilters.execute(query);

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
