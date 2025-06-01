"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionRateModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const users_surveys_responses_aux_entity_1 = require("../inside-schema/users-surveys-responses-aux.entity");
const conversion_rate_controller_1 = require("../../../infrastructure/controllers/conversion-rate/conversion-rate.controller");
const conversion_rate_provider_1 = require("../providers/conversion-rate.provider");
const common_1 = require("@nestjs/common");
const daily_conversion_rate_view_entity_1 = require("../inside-schema/daily-conversion-rate.view.entity");
let ConversionRateModule = class ConversionRateModule {
};
exports.ConversionRateModule = ConversionRateModule;
exports.ConversionRateModule = ConversionRateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_surveys_responses_aux_entity_1.default, daily_conversion_rate_view_entity_1.DailyConversionRateView]),
        ],
        exports: [],
        controllers: [conversion_rate_controller_1.ConversionRateController],
        providers: conversion_rate_provider_1.ConversionRateProviders,
    })
], ConversionRateModule);
//# sourceMappingURL=conversion-rate.module.js.map