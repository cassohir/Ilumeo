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
exports.DailyConversionRateView = void 0;
const typeorm_1 = require("typeorm");
let DailyConversionRateView = class DailyConversionRateView {
};
exports.DailyConversionRateView = DailyConversionRateView;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], DailyConversionRateView.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], DailyConversionRateView.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], DailyConversionRateView.prototype, "total_sends", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], DailyConversionRateView.prototype, "total_converts", void 0);
exports.DailyConversionRateView = DailyConversionRateView = __decorate([
    (0, typeorm_1.ViewEntity)({
        schema: 'inside',
        name: 'mv_daily_conversion_rate',
        expression: `SELECT origin, date_trunc('day', created_at) AS day, COUNT(id) AS total_sends, COUNT(response_status_id) FILTER (WHERE response_status_id = 1) AS total_converts FROM inside.users_surveys_responses_aux GROUP BY origin, date_trunc('day', created_at)`,
    })
], DailyConversionRateView);
//# sourceMappingURL=daily-conversion-rate.view.entity.js.map