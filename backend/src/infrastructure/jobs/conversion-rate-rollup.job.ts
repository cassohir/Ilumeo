import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class ConversionRateRollupService {
  private readonly logger = new Logger(ConversionRateRollupService.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: 'America/Sao_Paulo',
  })
  async refreshDailyView() {
    this.logger.debug(
      '[DAILY] Iniciando refresh da materialized view diária...',
    );
    try {
      await this.dataSource.query(
        `REFRESH MATERIALIZED VIEW CONCURRENTLY inside.mv_daily_conversion_rate`,
      );
      this.logger.debug('[DAILY] Refresh concluído.');
    } catch (error) {
      this.logger.error('[DAILY] Erro ao atualizar daily view:', error);
    }
  }

  @Cron(CronExpression.EVERY_WEEK, {
    timeZone: 'America/Sao_Paulo',
  })
  async refreshWeeklyView() {
    this.logger.debug(
      '[WEEKLY] Iniciando refresh da materialized view semanal...',
    );
    try {
      await this.dataSource.query(
        `REFRESH MATERIALIZED VIEW CONCURRENTLY inside.mv_weekly_conversion_rate`,
      );
      this.logger.debug('[WEEKLY] Refresh concluído.');
    } catch (error) {
      this.logger.error('[WEEKLY] Erro ao atualizar weekly view:', error);
    }
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, {
    timeZone: 'America/Sao_Paulo',
  })
  async refreshMonthlyView() {
    this.logger.debug(
      '[MONTHLY] Iniciando refresh da materialized view mensal...',
    );
    try {
      await this.dataSource.query(
        `REFRESH MATERIALIZED VIEW CONCURRENTLY inside.mv_monthly_conversion_rate`,
      );
      this.logger.debug('[MONTHLY] Refresh concluído.');
    } catch (error) {
      this.logger.error('[MONTHLY] Erro ao atualizar monthly view:', error);
    }
  }
}
