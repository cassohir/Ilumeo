import { TypeOrmModule } from '@nestjs/typeorm';
import UserSurveyResponseAux from '../inside-schema/users-surveys-responses-aux.entity';
import { ConversionRateController } from '@/infrastructure/controllers/conversion-rate/conversion-rate.controller';
import { ConversionRateProviders } from '../providers/conversion-rate.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserSurveyResponseAux])],
  exports: [],
  controllers: [ConversionRateController],
  providers: ConversionRateProviders,
})
export class ConversionRateModule {}
