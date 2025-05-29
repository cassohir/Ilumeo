import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export enum Channel {
  EMAIL = 'email',
  WHATSAPP = 'wpp',
  MOBILE = 'MOBILE',
}

export const conversionRateSchema = z.object({
  channel: z.nativeEnum(Channel),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).default(100),
});

export class ConversionRateQueryDto extends createZodDto(
  conversionRateSchema,
) {}
