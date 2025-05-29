import UserSurveyResponseAuxRepository from '@/infrastructure/repositories/user-survey-response-aux.repository';
import { ConversionRateService } from '@/infrastructure/services/conversion-rate.service';

export const ConversionRateProviders = [
  ConversionRateService,
  UserSurveyResponseAuxRepository,
];
