"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalEvolutionConversionRateParamsDto = exports.temporalEvolutionConversionRateParamsSchema = exports.ConversionRateQueryDto = exports.conversionRateSchema = exports.Channel = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
var Channel;
(function (Channel) {
    Channel["EMAIL"] = "email";
    Channel["WHATSAPP"] = "wpp";
    Channel["MOBILE"] = "MOBILE";
    Channel["ALL"] = "all";
})(Channel || (exports.Channel = Channel = {}));
exports.conversionRateSchema = zod_1.z
    .object({
    channel: zod_1.z.nativeEnum(Channel),
    startDate: zod_1.z.string().date(),
    endDate: zod_1.z.string().date(),
    page: zod_1.z.string().regex(/^\d+$/).default('1'),
    limit: zod_1.z.string().regex(/^\d+$/).default('30'),
})
    .refine((data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return start < end;
}, {
    message: 'startDate must be before endDate',
    path: ['startDate', 'endDate'],
});
class ConversionRateQueryDto extends (0, nestjs_zod_1.createZodDto)(exports.conversionRateSchema) {
}
exports.ConversionRateQueryDto = ConversionRateQueryDto;
exports.temporalEvolutionConversionRateParamsSchema = zod_1.z.object({
    channel: zod_1.z.nativeEnum(Channel),
    startDate: zod_1.z.string().date(),
    endDate: zod_1.z.string().date(),
    offset: zod_1.z.number().int().min(0).default(0),
    limit: zod_1.z.number().int().min(1).default(100),
});
class TemporalEvolutionConversionRateParamsDto extends (0, nestjs_zod_1.createZodDto)(exports.temporalEvolutionConversionRateParamsSchema) {
}
exports.TemporalEvolutionConversionRateParamsDto = TemporalEvolutionConversionRateParamsDto;
//# sourceMappingURL=conversion-rate.dto.js.map