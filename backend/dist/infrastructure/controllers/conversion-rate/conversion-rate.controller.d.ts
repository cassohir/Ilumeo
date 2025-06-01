import { ConversionRateService } from '@/infrastructure/services/conversion-rate.service';
import { ConversionRateQueryDto } from '@/shared/dtos/conversion-rate.dto';
export declare class ConversionRateController {
    private readonly conversionRateService;
    constructor(conversionRateService: ConversionRateService);
    getConversionRateEvolution(query: ConversionRateQueryDto): Promise<unknown>;
}
