"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const config_1 = require("@nestjs/config");
const service_config_1 = require("../environment/service.config");
dotenv.config({ path: './.env/.env' });
const configService = new service_config_1.EnvironmentConfigService(new config_1.ConfigService());
const config = {
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
    schema: 'inside',
};
exports.default = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.config.js.map