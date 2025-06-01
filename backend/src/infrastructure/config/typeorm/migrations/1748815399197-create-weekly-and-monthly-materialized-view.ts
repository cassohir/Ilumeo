import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWeeklyAndMonthlyMaterializedView1748815399197
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE MATERIALIZED VIEW inside.mv_weekly_conversion_rate AS
      SELECT
        origin,
        date_trunc('week', created_at) AS week,
        COUNT(id) AS total_sends,
        COUNT(response_status_id) FILTER (WHERE response_status_id = 1) AS total_converts
      FROM inside.users_surveys_responses_aux
      GROUP BY origin, date_trunc('week', created_at);
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX mv_weekly_idx_origin_week
        ON inside.mv_weekly_conversion_rate (origin, week);
    `);

    await queryRunner.query(`
      CREATE MATERIALIZED VIEW inside.mv_monthly_conversion_rate AS
      SELECT
        origin,
        date_trunc('month', created_at) AS month,
        COUNT(id) AS total_sends,
        COUNT(response_status_id) FILTER (WHERE response_status_id = 1) AS total_converts
      FROM inside.users_surveys_responses_aux
      GROUP BY origin, date_trunc('month', created_at);
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX mv_monthly_idx_origin_month
        ON inside.mv_monthly_conversion_rate (origin, month);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS inside.mv_weekly_idx_origin_week;
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS inside.mv_monthly_idx_origin_month;
    `);

    await queryRunner.query(`
      DROP MATERIALIZED VIEW IF EXISTS inside.mv_weekly_conversion_rate;
    `);

    await queryRunner.query(`
      DROP MATERIALIZED VIEW IF EXISTS inside.mv_monthly_conversion_rate;
    `);
  }
}
