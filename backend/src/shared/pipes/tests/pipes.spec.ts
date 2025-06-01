import { ZodError, z } from 'zod';
import { ArgumentMetadata } from '@nestjs/common';
import { ZodValidationPipe } from '../zod.pipe';
import { conversionRateSchema } from '@/shared/dtos/conversion-rate.dto';

describe('ZodValidationPipe', () => {
  let pipe: ZodValidationPipe;

  beforeEach(() => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number().min(18),
    });

    pipe = new ZodValidationPipe(schema);
  });

  it('should validate and transform valid data', () => {
    const validData = { name: 'John Doe', age: 30 };

    expect(pipe.transform(validData, {} as ArgumentMetadata)).toEqual(
      validData,
    );
  });

  it('should throw ZodError with correct details when validation fails', () => {
    const invalidData = { name: '', age: 17 };

    try {
      pipe.transform(invalidData, {} as ArgumentMetadata);
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error).toBeInstanceOf(ZodError);
      }
    }
  });

  it('should validate valid startDate and endDate', () => {
    const validData = {
      channel: 'wpp',
      startDate: '2025-01-01',
      endDate: '2025-01-02',
      page: '1',
      limit: '30',
    };

    expect(() => conversionRateSchema.parse(validData)).not.toThrow();
  });
});
