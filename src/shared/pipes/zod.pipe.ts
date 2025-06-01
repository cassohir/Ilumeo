import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

/**
 * Global Pipe for Zod validation...
 */
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const zodIssues = {
          ...error.errors,
          metadata: JSON.stringify(metadata),
        };
        throw new ZodError(zodIssues);
      }
    }
  }
}
