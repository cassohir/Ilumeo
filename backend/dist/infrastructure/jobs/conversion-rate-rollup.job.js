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
var ConversionRateRollupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionRateRollupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("typeorm");
let ConversionRateRollupService = ConversionRateRollupService_1 = class ConversionRateRollupService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(ConversionRateRollupService_1.name);
    }
    async handleRefresh() {
        this.logger.debug('Iniciando refresh da materialized view...');
        await this.dataSource.query(`REFRESH MATERIALIZED VIEW CONCURRENTLY inside.mv_daily_conversion_rate`);
        this.logger.debug('Refresh concluído.');
    }
};
exports.ConversionRateRollupService = ConversionRateRollupService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConversionRateRollupService.prototype, "handleRefresh", null);
exports.ConversionRateRollupService = ConversionRateRollupService = ConversionRateRollupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ConversionRateRollupService);
//# sourceMappingURL=conversion-rate-rollup.job.js.map