import { ConversionRateQueryDto } from '@/shared/dtos/conversion-rate.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversionRateService {
  async getConversionRateEvolution(query: ConversionRateQueryDto) {
    console.log('Query received:', query);
    /// return;
  }
}
