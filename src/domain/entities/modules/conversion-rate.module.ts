import { TypeOrmModule } from '@nestjs/typeorm';
import UserSurveyResponseAux from '../inside-schema/users-surveys-responses-aux.entity';
import { ConversionRateController } from '@/infrastructure/controllers/conversion-rate/conversion-rate.controller';
import { ConversionRateProviders } from '../providers/conversion-rate.provider';
import { Module } from '@nestjs/common';
import { DailyConversionRateView } from '../inside-schema/daily-conversion-rate.view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSurveyResponseAux, DailyConversionRateView]),
  ],
  exports: [],
  controllers: [ConversionRateController],
  providers: ConversionRateProviders,
})
export class ConversionRateModule {}
