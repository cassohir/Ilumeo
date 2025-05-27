import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment/service.config';
import { EnvironmentConfigModule } from '../environment/service.module';

const DATABASE_TYPE = 'postgres';

export const getTypeOrmModuleOptions = (
  configService: EnvironmentConfigService,
): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: DATABASE_TYPE,
    host: configService.getDatabaseHost(),
    port: configService.getDatabasePort(),
    username: configService.getDatabaseUser(),
    password: configService.getDatabasePassword(),
    database: configService.getDatabaseName(),
    entities: [__dirname + '/../../../domain/entities/*.entity{.ts,.js}'],
    // synchronize: configService.getDatabaseSync(),
    migrations: ['./migrations/*{.ts,.js}'],
  };
  return options;
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeormModule {}
