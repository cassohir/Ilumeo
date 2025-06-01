import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment/service.config';
export declare const getTypeOrmModuleOptions: (configService: EnvironmentConfigService) => TypeOrmModuleOptions;
export declare class TypeormModule {
}
