import { ConversionRateRollupService } from '@/infrastructure/jobs/conversion-rate-rollup.job';
import UserSurveyResponseAuxRepository from '@/infrastructure/repositories/user-survey-response-aux.repository';
import { ConversionRateService } from '@/infrastructure/services/conversion-rate.service';

export const ConversionRateProviders = [
  ConversionRateService,
  ConversionRateRollupService,
  UserSurveyResponseAuxRepository,
];
