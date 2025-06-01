"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIndexForOptimization1748468201098 = void 0;
class CreateIndexForOptimization1748468201098 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS idx_origin_created_at_status
            ON inside.users_surveys_responses_aux (origin, created_at DESC, response_status_id);
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX idx_origin_created_at_status;
        `);
    }
}
exports.CreateIndexForOptimization1748468201098 = CreateIndexForOptimization1748468201098;
//# sourceMappingURL=1748468201098-create_index-for-optimization.js.map