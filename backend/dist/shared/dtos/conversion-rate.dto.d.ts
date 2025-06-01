import { z } from 'zod';
export declare enum Channel {
    EMAIL = "email",
    WHATSAPP = "wpp",
    MOBILE = "MOBILE",
    ALL = "all"
}
export declare const conversionRateSchema: z.ZodEffects<z.ZodObject<{
    channel: z.ZodNativeEnum<typeof Channel>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    page: z.ZodDefault<z.ZodString>;
    limit: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
}, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
}>, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
}, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
}>;
declare const ConversionRateQueryDto_base: import("nestjs-zod").ZodDto<{
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
}, z.ZodEffectsDef<z.ZodObject<{
    channel: z.ZodNativeEnum<typeof Channel>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    page: z.ZodDefault<z.ZodString>;
    limit: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
}, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
}>>, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
}>;
export declare class ConversionRateQueryDto extends ConversionRateQueryDto_base {
}
export declare const temporalEvolutionConversionRateParamsSchema: z.ZodObject<{
    channel: z.ZodNativeEnum<typeof Channel>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    offset: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
}, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
}>;
declare const TemporalEvolutionConversionRateParamsDto_base: import("nestjs-zod").ZodDto<{
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
}, z.ZodObjectDef<{
    channel: z.ZodNativeEnum<typeof Channel>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    offset: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny>, {
    channel?: Channel;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
}>;
export declare class TemporalEvolutionConversionRateParamsDto extends TemporalEvolutionConversionRateParamsDto_base {
}
export {};
