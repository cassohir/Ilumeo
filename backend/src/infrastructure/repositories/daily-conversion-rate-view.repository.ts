import { DailyConversionRateView } from '@/domain/entities/inside-schema/daily-conversion-rate.view.entity';
import { IDailyConversionRateViewRepository } from '@/domain/interfaces/daily-conversion-rate-view.interface';
import {
  Channel,
  TemporalEvolutionConversionRateParamsDto,
} from '@/shared/dtos/conversion-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class DailyConversionRateViewRepository
  implements IDailyConversionRateViewRepository
{
  constructor(
    @InjectRepository(DailyConversionRateView)
    private ormRepository: Repository<DailyConversionRateView>,
  ) {}

  async find(filters: any): Promise<DailyConversionRateView[]> {
    console.log('find', filters);
    return this.ormRepository.find(filters);
  }

  async getTemporalEvolutionConversionRateByChannel({
    channel,
    startDate,
    endDate,
    limit,
    offset,
  }: TemporalEvolutionConversionRateParamsDto): Promise<any[]> {
    const qb = this.ormRepository
      .createQueryBuilder('mv')
      .select([
        'mv.origin       AS channel',
        'mv.day          AS day',
        'mv.total_sends  AS total_sends',
        'mv.total_converts   AS total_converts',
        'ROUND(CAST(mv.total_converts AS DECIMAL) / NULLIF(mv.total_sends, 0) * 100, 2) AS conversion_rate',
      ])
      .where('mv.day BETWEEN :startDate AND :endDate', { startDate, endDate });

    if (channel !== Channel.ALL) {
      qb.andWhere('mv.origin = :channel', { channel });
    }

    qb.orderBy('mv.day', 'ASC').limit(limit).offset(offset);

    return await qb.getRawMany();
  }

  async index(page: number, limit: number): Promise<DailyConversionRateView[]> {
    console.log('index', { page, limit });
    return await this.ormRepository.find();
  }
}
