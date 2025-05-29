import { ConversionRateService } from '@/infrastructure/services/conversion-rate.service';
import { ConversionRateQueryDto } from '@/shared/dtos/conversion-rate.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('conversion-rate')
export class ConversionRateController {
  constructor(private readonly conversionRateService: ConversionRateService) {}

  @ApiQuery({
    name: 'channel',
    required: true,
    type: String,
    enum: ['email', 'wpp', 'MOBILE'],
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiOperation({ summary: 'Retorna a evolução da taxa de conversão' })
  @Get()
  async getConversionRateEvolution(@Query() query: ConversionRateQueryDto) {
    return this.conversionRateService.getConversionRateEvolution(query);
  }
}
