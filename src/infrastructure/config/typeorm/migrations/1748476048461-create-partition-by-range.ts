import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePartitionByRange1748476048461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT 1;`);
    //     await queryRunner.query(`
    //             ALTER TABLE inside.users_surveys_responses_aux PARTITION BY RANGE (created_at);
    //         `);

    //     await queryRunner.query(`
    //             CREATE TABLE inside.users_surveys_responses_aux_2025_01
    //             PARTITION OF inside.users_surveys_responses_aux
    //             FOR VALUES FROM ('2025-01-01 00:00:00') TO ('2025-02-01 00:00:00');
    //         `);

    //     await queryRunner.query(`
    //             CREATE TABLE inside.users_surveys_responses_aux_2025_02
    //             PARTITION OF inside.users_surveys_responses_aux
    //             FOR VALUES FROM ('2025-02-01 00:00:00') TO ('2025-03-01 00:00:00');
    //         `);

    //     await queryRunner.query(`
    //             CREATE TABLE inside.users_surveys_responses_aux_2025_03
    //             PARTITION OF inside.users_surveys_responses_aux
    //             FOR VALUES FROM ('2025-03-01 00:00:00') TO ('2025-04-01 00:00:00');
    //         `);

    //     await queryRunner.query(`
    //             CREATE TABLE inside.users_surveys_responses_aux_2025_04
    //             PARTITION OF inside.users_surveys_responses_aux
    //             FOR VALUES FROM ('2025-04-01 00:00:00') TO ('2025-05-01 00:00:00');
    //         `);

    //     await queryRunner.query(`
    //             CREATE TABLE inside.users_surveys_responses_aux_2025_05
    //             PARTITION OF inside.users_surveys_responses_aux
    //             FOR VALUES FROM ('2025-05-01 00:00:00') TO ('2025-06-01 00:00:00');
    //         `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT 1;`);
    //     // Remover as partições criadas
    //     await queryRunner.query(`
    //             DROP TABLE IF EXISTS inside.users_surveys_responses_aux_2025_01;
    //         `);
    //     await queryRunner.query(`
    //             DROP TABLE IF EXISTS inside.users_surveys_responses_aux_2025_02;
    //         `);
    //     await queryRunner.query(`
    //             DROP TABLE IF EXISTS inside.users_surveys_responses_aux_2025_03;
    //         `);
    //     await queryRunner.query(`
    //             DROP TABLE IF EXISTS inside.users_surveys_responses_aux_2025_04;
    //         `);
    //     await queryRunner.query(`
    //             DROP TABLE IF EXISTS inside.users_surveys_responses_aux_2025_05;
    //         `);
    //     await queryRunner.query(`
    //             ALTER TABLE inside.users_surveys_responses_aux
    //             NO PARTITION;
    //         `);
  }
}
