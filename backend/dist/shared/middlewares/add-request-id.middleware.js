"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRequestId = void 0;
const common_1 = require("@nestjs/common");
const genId_1 = require("../utils/genId");
let AddRequestId = class AddRequestId {
    use(request, _, next) {
        if (request.id)
            return;
        const existingRequestId = request.header('X-Request-Id');
        const newId = (0, genId_1.genId)();
        if (!existingRequestId)
            request.headers['X-Request-Id'] = newId;
        request.id = existingRequestId || newId;
        return next();
    }
};
exports.AddRequestId = AddRequestId;
exports.AddRequestId = AddRequestId = __decorate([
    (0, common_1.Injectable)()
], AddRequestId);
//# sourceMappingURL=add-request-id.middleware.js.map