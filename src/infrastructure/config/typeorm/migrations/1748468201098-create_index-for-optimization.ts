import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIndexForOptimization1748468201098
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS idx_origin_created_at_status
            ON inside.users_surveys_responses_aux (origin, created_at DESC, response_status_id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX idx_origin_created_at_status;
        `);
  }
}
