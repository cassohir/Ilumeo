import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/services/api';
import { format } from 'date-fns';

export interface ConversionData {
  channel: string;
  day: string;
  conversionRate: number;
  totalSends: number;
  totalConversions: number;
}

interface Params {
  startDate: Date;
  endDate: Date;
  channel: string;
  limit?: number;
}

export const useConversionRates = ({
  startDate,
  endDate,
  channel,
  limit = 100,
}: Params) => {
  const formattedStart = format(startDate, 'yyyy-MM-dd');
  const formattedEnd = format(endDate, 'yyyy-MM-dd');

  return useQuery<ConversionData[]>({
    queryKey: ['conversionRates', formattedStart, formattedEnd, channel, limit],
    queryFn: () =>
      fetcher(
        `/conversion-rate?limit=${limit}&startDate=${formattedStart}&endDate=${formattedEnd}&channel=${channel}`,
      ),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
