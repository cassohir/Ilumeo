import { ConversionRateUseCases } from './conversion-rate-usecases';
import { GetConversionRateEvolutionByFiltersUseCase } from './get-conversion-rate-evolution-by-filters.usecase';

describe('ConversionRateUseCases', () => {
  it('should contain GetConversionRateEvolutionByFiltersUseCase', () => {
    expect(ConversionRateUseCases).toContain(
      GetConversionRateEvolutionByFiltersUseCase,
    );
  });

  it('should only contain GetConversionRateEvolutionByFiltersUseCase', () => {
    expect(ConversionRateUseCases).toHaveLength(1);
    expect(ConversionRateUseCases[0]).toBe(
      GetConversionRateEvolutionByFiltersUseCase,
    );
  });
});
