import { Repository } from '@/shared/base/repository';
import { TemporalEvolutionConversionRateParamsDto } from '@/shared/dtos/conversion-rate.dto';
import { DailyConversionRateView } from '../entities/inside-schema/daily-conversion-rate.view.entity';
export declare abstract class IDailyConversionRateViewRepository extends Repository<DailyConversionRateView> {
    abstract getTemporalEvolutionConversionRateByChannel(params: TemporalEvolutionConversionRateParamsDto): Promise<any[]>;
}
