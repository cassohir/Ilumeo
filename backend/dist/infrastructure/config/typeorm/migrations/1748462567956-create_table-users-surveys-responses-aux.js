"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsersSurveysResponsesAux1748462567956 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsersSurveysResponsesAux1748462567956 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users_surveys_responses_aux',
            schema: 'inside',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: false,
                },
                {
                    name: 'origin',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'response_status_id',
                    type: 'int',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users_surveys_responses_aux', true, true, true);
    }
}
exports.CreateTableUsersSurveysResponsesAux1748462567956 = CreateTableUsersSurveysResponsesAux1748462567956;
//# sourceMappingURL=1748462567956-create_table-users-surveys-responses-aux.js.map