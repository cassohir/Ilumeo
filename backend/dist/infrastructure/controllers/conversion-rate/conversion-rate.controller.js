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
exports.ConversionRateController = void 0;
const conversion_rate_service_1 = require("../../services/conversion-rate.service");
const conversion_rate_dto_1 = require("../../../shared/dtos/conversion-rate.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let ConversionRateController = class ConversionRateController {
    constructor(conversionRateService) {
        this.conversionRateService = conversionRateService;
    }
    async getConversionRateEvolution(query) {
        return this.conversionRateService.getConversionRateEvolution(query);
    }
};
exports.ConversionRateController = ConversionRateController;
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'channel',
        required: true,
        type: String,
        enum: ['email', 'wpp', 'MOBILE', 'all'],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'startDate',
        required: true,
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'endDate',
        required: true,
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: String,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna a evolução da taxa de conversão' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conversion_rate_dto_1.ConversionRateQueryDto]),
    __metadata("design:returntype", Promise)
], ConversionRateController.prototype, "getConversionRateEvolution", null);
exports.ConversionRateController = ConversionRateController = __decorate([
    (0, common_1.Controller)('conversion-rate'),
    __metadata("design:paramtypes", [conversion_rate_service_1.ConversionRateService])
], ConversionRateController);
//# sourceMappingURL=conversion-rate.controller.js.map