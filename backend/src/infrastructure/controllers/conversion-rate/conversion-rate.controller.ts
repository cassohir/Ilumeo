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
    enum: ['email', 'wpp', 'MOBILE', 'all'],
    description: 'Canal de origem (email, wpp, MOBILE, all)',
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'Data de início no formato YYYY-MM-DD',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'Data de fim no formato YYYY-MM-DD',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número da página (padrão: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Número de itens por página (padrão: 30)',
  })
  @ApiQuery({
    name: 'interval',
    required: true,
    type: String,
    default: 'daily',
    enum: ['daily', 'weekly', 'monthly'],
    description: 'Intervalo de tempo para a evolução (diário, semanal, mensal)',
  })
  @ApiOperation({ summary: 'Retorna a evolução da taxa de conversão' })
  @Get()
  async getConversionRateEvolution(@Query() query: ConversionRateQueryDto) {
    return this.conversionRateService.getConversionRateEvolution(query);
  }
}
