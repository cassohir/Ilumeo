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
const daily_conversion_rate_view_entity_1 = require("../../domain/entities/inside-schema/daily-conversion-rate.view.entity");
const conversion_rate_dto_1 = require("../../shared/dtos/conversion-rate.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let DailyConversionRateViewRepository = class DailyConversionRateViewRepository {
    constructor(ormRepository) {
        this.ormRepository = ormRepository;
    }
    async find(filters) {
        console.log('find', filters);
        return this.ormRepository.find(filters);
    }
    async getTemporalEvolutionConversionRateByChannel({ channel, startDate, endDate, limit, offset, }) {
        const qb = this.ormRepository
            .createQueryBuilder('mv')
            .select([
            'mv.origin       AS channel',
            'mv.day          AS day',
            'mv.total_sends  AS total_sends',
            'mv.total_converts   AS total_converts',
            'ROUND(CAST(mv.total_converts AS DECIMAL) / NULLIF(mv.total_sends, 0) * 100, 2) AS conversion_rate',
        ])
            .where('mv.day BETWEEN :startDate AND :endDate', { startDate, endDate });
        if (channel !== conversion_rate_dto_1.Channel.ALL) {
            qb.andWhere('mv.origin = :channel', { channel });
        }
        qb.orderBy('mv.day', 'ASC').limit(limit).offset(offset);
        return await qb.getRawMany();
    }
    async index(page, limit) {
        console.log('index', { page, limit });
        return await this.ormRepository.find();
    }
};
DailyConversionRateViewRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(daily_conversion_rate_view_entity_1.DailyConversionRateView)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DailyConversionRateViewRepository);
exports.default = DailyConversionRateViewRepository;
//# sourceMappingURL=daily-conversion-rate-view.repository.js.map