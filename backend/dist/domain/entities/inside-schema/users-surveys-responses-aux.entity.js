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
const typeorm_1 = require("typeorm");
let UserSurveyResponseAux = class UserSurveyResponseAux {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], UserSurveyResponseAux.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], UserSurveyResponseAux.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response_status_id', type: 'int' }),
    __metadata("design:type", Number)
], UserSurveyResponseAux.prototype, "responseStatusId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserSurveyResponseAux.prototype, "createdAt", void 0);
UserSurveyResponseAux = __decorate([
    (0, typeorm_1.Entity)({ schema: 'inside', name: 'users_surveys_responses_aux' })
], UserSurveyResponseAux);
exports.default = UserSurveyResponseAux;
//# sourceMappingURL=users-surveys-responses-aux.entity.js.map