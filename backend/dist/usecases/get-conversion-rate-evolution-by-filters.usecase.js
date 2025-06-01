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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConversionRateEvolutionByFiltersUseCase = void 0;
const daily_conversion_rate_view_interface_1 = require("../domain/interfaces/daily-conversion-rate-view.interface");
const daily_conversion_rate_view_repository_1 = require("../infrastructure/repositories/daily-conversion-rate-view.repository");
const common_1 = require("@nestjs/common");
let GetConversionRateEvolutionByFiltersUseCase = class GetConversionRateEvolutionByFiltersUseCase {
    constructor(dailyConversionRateRepository) {
        this.dailyConversionRateRepository = dailyConversionRateRepository;
    }
    async execute(query) {
        const limit = Number(query.limit) || 10;
        const page = Number(query.page) || 1;
        const offset = (page - 1) * limit;
        const results = await this.dailyConversionRateRepository.getTemporalEvolutionConversionRateByChannel({
            limit,
            offset: offset,
            channel: query.channel,
            endDate: query.endDate,
            startDate: query.startDate,
        });
        return results;
    }
};
exports.GetConversionRateEvolutionByFiltersUseCase = GetConversionRateEvolutionByFiltersUseCase;
exports.GetConversionRateEvolutionByFiltersUseCase = GetConversionRateEvolutionByFiltersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(daily_conversion_rate_view_repository_1.default)),
    __metadata("design:paramtypes", [daily_conversion_rate_view_interface_1.IDailyConversionRateViewRepository])
], GetConversionRateEvolutionByFiltersUseCase);
//# sourceMappingURL=get-conversion-rate-evolution-by-filters.usecase.js.map