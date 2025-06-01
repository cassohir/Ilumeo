"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionRateProviders = void 0;
const conversion_rate_rollup_job_1 = require("../../../infrastructure/jobs/conversion-rate-rollup.job");
const daily_conversion_rate_view_repository_1 = require("../../../infrastructure/repositories/daily-conversion-rate-view.repository");
const user_survey_response_aux_repository_1 = require("../../../infrastructure/repositories/user-survey-response-aux.repository");
const cache_service_1 = require("../../../infrastructure/services/cache.service");
const conversion_rate_service_1 = require("../../../infrastructure/services/conversion-rate.service");
const conversion_rate_usecases_1 = require("../../../usecases/conversion-rate-usecases");
exports.ConversionRateProviders = [
    cache_service_1.CacheService,
    conversion_rate_service_1.ConversionRateService,
    conversion_rate_rollup_job_1.ConversionRateRollupService,
    daily_conversion_rate_view_repository_1.default,
    user_survey_response_aux_repository_1.default,
    ...conversion_rate_usecases_1.ConversionRateUseCases,
];
//# sourceMappingURL=conversion-rate.provider.js.map