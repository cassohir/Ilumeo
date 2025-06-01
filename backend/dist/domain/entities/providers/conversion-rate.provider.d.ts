import { ConversionRateRollupService } from '@/infrastructure/jobs/conversion-rate-rollup.job';
import DailyConversionRateViewRepository from '@/infrastructure/repositories/daily-conversion-rate-view.repository';
import UserSurveyResponseAuxRepository from '@/infrastructure/repositories/user-survey-response-aux.repository';
import { CacheService } from '@/infrastructure/services/cache.service';
import { ConversionRateService } from '@/infrastructure/services/conversion-rate.service';
export declare const ConversionRateProviders: (typeof DailyConversionRateViewRepository | typeof import("../../../usecases/get-conversion-rate-evolution-by-filters.usecase").GetConversionRateEvolutionByFiltersUseCase | typeof CacheService | typeof ConversionRateService | typeof ConversionRateRollupService | typeof UserSurveyResponseAuxRepository)[];
