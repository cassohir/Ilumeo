import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export enum Channel {
  EMAIL = 'email',
  WHATSAPP = 'wpp',
  MOBILE = 'MOBILE',
  ALL = 'all',
}

export enum Interval {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export const conversionRateSchema = z
  .object({
    channel: z.nativeEnum(Channel),
    startDate: z.string().date(),
    endDate: z.string().date(),
    interval: z.nativeEnum(Interval).optional().default(Interval.DAILY),
    page: z.string().regex(/^\d+$/).default('1'),
    limit: z.string().regex(/^\d+$/).default('30'),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start < end;
    },
    {
      message: 'startDate must be before endDate',
      path: ['startDate', 'endDate'],
    },
  );

export class ConversionRateQueryDto extends createZodDto(
  conversionRateSchema,
) {}

export const temporalEvolutionConversionRateParamsSchema = z.object({
  channel: z.nativeEnum(Channel),
  startDate: z.string().date(),
  endDate: z.string().date(),
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).default(100),
});
export class TemporalEvolutionConversionRateParamsDto extends createZodDto(
  temporalEvolutionConversionRateParamsSchema,
) {}
