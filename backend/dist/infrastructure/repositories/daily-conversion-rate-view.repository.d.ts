import { DailyConversionRateView } from '@/domain/entities/inside-schema/daily-conversion-rate.view.entity';
import { IDailyConversionRateViewRepository } from '@/domain/interfaces/daily-conversion-rate-view.interface';
import { TemporalEvolutionConversionRateParamsDto } from '@/shared/dtos/conversion-rate.dto';
import { Repository } from 'typeorm';
export default class DailyConversionRateViewRepository implements IDailyConversionRateViewRepository {
    private ormRepository;
    constructor(ormRepository: Repository<DailyConversionRateView>);
    find(filters: any): Promise<DailyConversionRateView[]>;
    getTemporalEvolutionConversionRateByChannel({ channel, startDate, endDate, limit, offset, }: TemporalEvolutionConversionRateParamsDto): Promise<any[]>;
    index(page: number, limit: number): Promise<DailyConversionRateView[]>;
}
