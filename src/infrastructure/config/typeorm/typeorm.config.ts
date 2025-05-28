import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigService } from '../environment/service.config';

dotenv.config({ path: './.env/.env' });
const configService = new EnvironmentConfigService(new ConfigService());

const config: DataSourceOptions = {
  type: 'postgres',
  host: configService.getDatabaseHost(),
  port: configService.getDatabasePort(),
  username: configService.getDatabaseUser(),
  password: configService.getDatabasePassword(),
  database: configService.getDatabaseName(),
  entities: [__dirname + '/../../../domain/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
  migrationsTableName: 'pg_migrations',
  extra: {
    options: '-c search_path=inside,public',
  },
};

console.log(config);

export default new DataSource(config);
