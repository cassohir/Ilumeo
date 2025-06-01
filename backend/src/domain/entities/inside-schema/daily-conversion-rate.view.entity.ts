import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  schema: 'inside',
  name: 'mv_daily_conversion_rate',
  expression: `SELECT origin, date_trunc('day', created_at) AS day, COUNT(id) AS total_sends, COUNT(response_status_id) FILTER (WHERE response_status_id = 1) AS total_converts FROM inside.users_surveys_responses_aux GROUP BY origin, date_trunc('day', created_at)`,
})
export class DailyConversionRateView {
  @ViewColumn()
  origin: string;

  @ViewColumn()
  day: Date;

  @ViewColumn()
  total_sends: number;

  @ViewColumn()
  total_converts: number;
}
