import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsersSurveysResponsesAux1748462567956
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação da tabela
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Excluir a tabela
    await queryRunner.dropTable(
      'users_surveys_responses_aux',
      true,
      true,
      true,
    );
  }
}
