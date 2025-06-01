import { IDailyConversionRateViewRepository } from '@/domain/interfaces/daily-conversion-rate-view.interface';
import { UseCase } from '@/shared/base/usecase';
import { ConversionRateQueryDto } from '@/shared/dtos/conversion-rate.dto';
export declare class GetConversionRateEvolutionByFiltersUseCase implements UseCase<ConversionRateQueryDto, any> {
    private readonly dailyConversionRateRepository;
    constructor(dailyConversionRateRepository: IDailyConversionRateViewRepository);
    execute(query: ConversionRateQueryDto): Promise<any[]>;
}
