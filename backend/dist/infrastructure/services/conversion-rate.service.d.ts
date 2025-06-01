import { ConversionRateQueryDto } from '@/shared/dtos/conversion-rate.dto';
import { GetConversionRateEvolutionByFiltersUseCase } from '@/usecases/get-conversion-rate-evolution-by-filters.usecase';
import { CacheService } from './cache.service';
export declare class ConversionRateService {
    private readonly cacheService;
    private readonly getConversionRateEvolutionByFilters;
    constructor(cacheService: CacheService, getConversionRateEvolutionByFilters: GetConversionRateEvolutionByFiltersUseCase);
    getConversionRateEvolution(query: ConversionRateQueryDto): Promise<unknown>;
}
