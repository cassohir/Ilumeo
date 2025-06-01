"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMaterializedViewRollup1748482378856 = void 0;
class CreateMaterializedViewRollup1748482378856 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE MATERIALIZED VIEW inside.mv_daily_conversion_rate AS
            SELECT
              origin,
              date_trunc('day', created_at) AS day,
              COUNT(id) AS total_sends,
              COUNT(response_status_id) FILTER (WHERE response_status_id = 1) AS total_converts
            FROM inside.users_surveys_responses_aux
            GROUP BY origin, date_trunc('day', created_at);
        `);
        await queryRunner.query(`
            CREATE INDEX mv_daily_idx_origin_day
              ON inside.mv_daily_conversion_rate (origin, day);
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX IF EXISTS inside.mv_daily_idx_origin_day;
        `);
        await queryRunner.query(`
            DROP MATERIALIZED VIEW IF EXISTS inside.mv_daily_conversion_rate;
        `);
    }
}
exports.CreateMaterializedViewRollup1748482378856 = CreateMaterializedViewRollup1748482378856;
//# sourceMappingURL=1748482378856-create-materialized-view-rollup.js.map