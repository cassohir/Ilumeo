import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class ConversionRateRollupService {
  private readonly logger = new Logger(ConversionRateRollupService.name);
  constructor(private readonly dataSource: DataSource) {}

  //@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleRefresh() {
    this.logger.debug('Iniciando refresh da materialized view...');
    await this.dataSource.query(
      `REFRESH MATERIALIZED VIEW CONCURRENTLY inside.mv_daily_conversion_rate`,
    );
    this.logger.debug('Refresh concluído.');
  }
}
