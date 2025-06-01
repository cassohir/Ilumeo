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
exports.ConversionRateService = void 0;
const get_conversion_rate_evolution_by_filters_usecase_1 = require("../../usecases/get-conversion-rate-evolution-by-filters.usecase");
const common_1 = require("@nestjs/common");
const cache_service_1 = require("./cache.service");
let ConversionRateService = class ConversionRateService {
    constructor(cacheService, getConversionRateEvolutionByFilters) {
        this.cacheService = cacheService;
        this.getConversionRateEvolutionByFilters = getConversionRateEvolutionByFilters;
    }
    async getConversionRateEvolution(query) {
        const { channel, startDate, endDate, page, limit } = query;
        const cacheKey = `conv:${channel}:${startDate}:${endDate}:${page}:${limit}`;
        const cachedData = await this.cacheService.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const conversionRateEvolutionRate = await this.getConversionRateEvolutionByFilters.execute(query);
        const result = {
            data: conversionRateEvolutionRate,
            pagination: {
                page: Number(page) || 1,
                limit: Number(limit) || 10,
                totalItems: conversionRateEvolutionRate.length,
                totalPages: Math.ceil(conversionRateEvolutionRate.length / Number(limit)),
            },
        };
        this.cacheService.set(cacheKey, result, 60 * 60);
        return result;
    }
};
exports.ConversionRateService = ConversionRateService;
exports.ConversionRateService = ConversionRateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        get_conversion_rate_evolution_by_filters_usecase_1.GetConversionRateEvolutionByFiltersUseCase])
], ConversionRateService);
//# sourceMappingURL=conversion-rate.service.js.map