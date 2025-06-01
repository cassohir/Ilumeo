import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/services/api';
import {
  format,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from 'date-fns';
import type { ConversionRateEvolution } from '@/components/conversion-dashboard.component';

export interface ConversionData {
  channel: string;
  day: string;
  conversionRate: number;
  totalSends: number;
  totalConverts: number;
}

interface Params {
  startDate: Date;
  endDate: Date;
  channel: string;
  interval: 'daily' | 'weekly' | 'monthly';
  page?: number;
}

export const useConversionRates = ({
  startDate,
  endDate,
  channel,
  interval = 'daily',
  page = 1,
}: Params) => {
  const formattedStart = format(startDate, 'yyyy-MM-dd');
  const formattedEnd = format(endDate, 'yyyy-MM-dd');

  const calculatedLimit = (() => {
    switch (interval) {
      case 'daily':
        return differenceInDays(endDate, startDate) + 1;
      case 'weekly':
        return differenceInWeeks(endDate, startDate) + 1;
      case 'monthly':
        return differenceInMonths(endDate, startDate) + 1;
      default:
        return 100;
    }
  })();

  return useQuery<ConversionRateEvolution>({
    queryKey: [
      'conversionRates',
      formattedStart,
      formattedEnd,
      channel,
      calculatedLimit,
      interval,
      page,
    ],
    queryFn: () =>
      fetcher(
        `/conversion-rate?interval=${interval}&limit=${calculatedLimit}&page=${page}&startDate=${formattedStart}&endDate=${formattedEnd}&channel=${channel}`,
      ),
    staleTime: 1000 * 60 * 5,
  });
};
