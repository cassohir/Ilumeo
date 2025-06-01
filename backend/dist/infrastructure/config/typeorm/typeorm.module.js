"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormModule = exports.getTypeOrmModuleOptions = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_config_1 = require("../environment/service.config");
const service_module_1 = require("../environment/service.module");
const DATABASE_TYPE = 'postgres';
const getTypeOrmModuleOptions = (configService) => {
    const options = {
        type: DATABASE_TYPE,
        host: configService.getDatabaseHost(),
        port: configService.getDatabasePort(),
        username: configService.getDatabaseUser(),
        password: configService.getDatabasePassword(),
        database: configService.getDatabaseName(),
        entities: [
            __dirname + '/../../../domain/entities/inside-schema/*.entity{.ts,.js}',
        ],
        schema: 'inside',
        migrations: ['./migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations',
    };
    console.log(options);
    return options;
};
exports.getTypeOrmModuleOptions = getTypeOrmModuleOptions;
let TypeormModule = class TypeormModule {
};
exports.TypeormModule = TypeormModule;
exports.TypeormModule = TypeormModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [service_module_1.EnvironmentConfigModule],
                inject: [service_config_1.EnvironmentConfigService],
                useFactory: exports.getTypeOrmModuleOptions,
            }),
        ],
    })
], TypeormModule);
//# sourceMappingURL=typeorm.module.js.map