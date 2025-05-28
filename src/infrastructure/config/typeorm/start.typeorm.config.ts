import DataSource from './typeorm.config';

export const createSchema = async () => {
  try {
    await DataSource.initialize();

    const queryRunner = DataSource.createQueryRunner();
    console.log(queryRunner);

    await queryRunner.startTransaction();
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS inside;`);
    await queryRunner.commitTransaction();
    await queryRunner.release();
  } catch (error) {
    console.error('Erro ao criar schema "inside":', error);
  }
};

createSchema();
