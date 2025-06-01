import { MonthlyConversionRateView } from '@/domain/entities/inside-schema/monthly-conversion-rate.view.entity';

import { IMonthlyConversionRateViewRepository } from '@/domain/interfaces/monthly-conversion-rate.view.interface';
import {
  Channel,
  TemporalEvolutionConversionRateParamsDto,
} from '@/shared/dtos/conversion-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class MonthlyConversionRateViewRepository
  implements IMonthlyConversionRateViewRepository
{
  constructor(
    @InjectRepository(MonthlyConversionRateView)
    private ormRepository: Repository<MonthlyConversionRateView>,
  ) {}

  async find(filters: any): Promise<MonthlyConversionRateView[]> {
    console.log('find', filters);
    return this.ormRepository.find(filters);
  }

  async getMonthlyEvolutionConversionRateByChannel({
    channel,
    startDate,
    endDate,
    limit,
    offset,
  }: TemporalEvolutionConversionRateParamsDto): Promise<any[]> {
    const qb = this.ormRepository
      .createQueryBuilder('mv')
      .select([
        'mv.origin            AS channel',
        'mv.month               AS month',
        'CAST(mv.total_sends AS INTEGER)      AS "totalSends"',
        'CAST(mv.total_converts AS INTEGER)   AS "totalConverts"',
        'ROUND(CAST(mv.total_converts AS DECIMAL) / NULLIF(mv.total_sends, 0) * 100, 2) AS "conversionRate"',
      ])
      .where('mv.month BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    if (channel !== Channel.ALL) {
      qb.andWhere('mv.origin = :channel', { channel });
    }

    qb.orderBy('mv.month', 'ASC').limit(limit).offset(offset);

    return await qb.getRawMany();
  }

  async index(
    page: number,
    limit: number,
  ): Promise<MonthlyConversionRateView[]> {
    console.log('index', { page, limit });
    return await this.ormRepository.find();
  }
}
