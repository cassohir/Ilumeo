import { Repository } from '@/shared/base/repository';
import { TemporalEvolutionConversionRateParamsDto } from '@/shared/dtos/conversion-rate.dto';
import { DailyConversionRateView } from '../entities/inside-schema/daily-conversion-rate.view.entity';

export abstract class IDailyConversionRateViewRepository extends Repository<DailyConversionRateView> {
  /**
   * Gets the conversion rate evolution by filters.
   * @param params - The parameters for the conversion rate query.
   * @returns A promise that resolves to an array of conversion rates.
   */
  abstract getTemporalEvolutionConversionRateByChannel(
    params: TemporalEvolutionConversionRateParamsDto,
  ): Promise<any[]>;
}
