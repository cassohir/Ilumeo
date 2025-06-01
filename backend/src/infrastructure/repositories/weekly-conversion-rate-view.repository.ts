import { WeeklyConversionRateView } from '@/domain/entities/inside-schema/weekly-conversion-rate.view.entity';
import { IWeeklyConversionRateViewRepository } from '@/domain/interfaces/weekly-conversion-rate.view.interface';
import {
  Channel,
  TemporalEvolutionConversionRateParamsDto,
} from '@/shared/dtos/conversion-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class WeeklyConversionRateViewRepository
  implements IWeeklyConversionRateViewRepository
{
  constructor(
    @InjectRepository(WeeklyConversionRateView)
    private ormRepository: Repository<WeeklyConversionRateView>,
  ) {}

  async find(filters: any): Promise<WeeklyConversionRateView[]> {
    console.log('find', filters);
    return this.ormRepository.find(filters);
  }

  async getWeeklyEvolutionConversionRateByChannel({
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
        'mv.week              AS week',
        'CAST(mv.total_sends AS INTEGER)      AS "totalSends"',
        'CAST(mv.total_converts AS INTEGER)   AS "totalConverts"',
        'ROUND(CAST(mv.total_converts AS DECIMAL) / NULLIF(mv.total_sends, 0) * 100, 2) AS "conversionRate"',
      ])
      .where('mv.week BETWEEN :startDate AND :endDate', { startDate, endDate });

    if (channel !== Channel.ALL) {
      qb.andWhere('mv.origin = :channel', { channel });
    }

    qb.orderBy('mv.week', 'ASC').limit(limit).offset(offset);

    return await qb.getRawMany();
  }

  async index(
    page: number,
    limit: number,
  ): Promise<WeeklyConversionRateView[]> {
    console.log('index', { page, limit });
    return await this.ormRepository.find();
  }
}
