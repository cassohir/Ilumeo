import { ConversionRateRollupService } from '@/infrastructure/jobs/conversion-rate-rollup.job';
import DailyConversionRateViewRepository from '@/infrastructure/repositories/daily-conversion-rate-view.repository';
import MonthlyConversionRateViewRepository from '@/infrastructure/repositories/monthly-conversion-rate-view.repository';
import UserSurveyResponseAuxRepository from '@/infrastructure/repositories/user-survey-response-aux.repository';
import WeeklyConversionRateViewRepository from '@/infrastructure/repositories/weekly-conversion-rate-view.repository';
import { CacheService } from '@/infrastructure/services/cache.service';
import { ConversionRateService } from '@/infrastructure/services/conversion-rate.service';
import { ConversionRateUseCases } from '@/usecases/conversion-rate-usecases';

export const ConversionRateProviders = [
  CacheService,
  ConversionRateService,
  ConversionRateRollupService,
  DailyConversionRateViewRepository,
  WeeklyConversionRateViewRepository,
  MonthlyConversionRateViewRepository,
  UserSurveyResponseAuxRepository,
  ...ConversionRateUseCases,
];
