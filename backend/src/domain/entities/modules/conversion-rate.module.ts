import { TypeOrmModule } from '@nestjs/typeorm';
import UserSurveyResponseAux from '../inside-schema/users-surveys-responses-aux.entity';
import { ConversionRateController } from '@/infrastructure/controllers/conversion-rate/conversion-rate.controller';
import { ConversionRateProviders } from '../providers/conversion-rate.provider';
import { Module } from '@nestjs/common';
import { DailyConversionRateView } from '../inside-schema/daily-conversion-rate.view.entity';
import { WeeklyConversionRateView } from '../inside-schema/weekly-conversion-rate.view.entity';
import { MonthlyConversionRateView } from '../inside-schema/monthly-conversion-rate.view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSurveyResponseAux,
      DailyConversionRateView,
      WeeklyConversionRateView,
      MonthlyConversionRateView,
    ]),
  ],
  exports: [],
  controllers: [ConversionRateController],
  providers: ConversionRateProviders,
})
export class ConversionRateModule {}
