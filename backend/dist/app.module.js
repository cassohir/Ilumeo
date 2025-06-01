"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const typeorm_module_1 = require("./infrastructure/config/typeorm/typeorm.module");
const app_controller_1 = require("./app.controller");
const core_1 = require("@nestjs/core");
const nestjs_zod_1 = require("nestjs-zod");
const modules_module_1 = require("./infrastructure/modules.module");
const add_request_id_middleware_1 = require("./shared/middlewares/add-request-id.middleware");
const logger_middleware_1 = require("./shared/middlewares/logger.middleware");
const schedule_1 = require("@nestjs/schedule");
const redis_config_1 = require("./infrastructure/config/database/redis.config");
const cache_manager_1 = require("@nestjs/cache-manager");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    configure(consumer) {
        consumer.apply(add_request_id_middleware_1.AddRequestId).forRoutes('*');
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env/.env',
            }),
            schedule_1.ScheduleModule.forRoot(),
            cache_manager_1.CacheModule.registerAsync(redis_config_1.RedisOptions),
            typeorm_module_1.TypeormModule,
            ...modules_module_1.AppModules,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useClass: nestjs_zod_1.ZodValidationPipe,
            },
        ],
    }),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map