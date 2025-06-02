import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import type { ConversionData } from './conversion-dashboard.component';
import { Skeleton } from './ui/skeleton';
import { ptBR } from 'date-fns/locale';

interface ConversionChartProps {
  data: ConversionData[];
  loading: boolean;
}

export const ConversionChart = ({ data, loading }: ConversionChartProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        <div className="text-center">
          <div className="text-lg font-medium">Nenhum valor disponível</div>
          <div className="text-sm">Tente ajustar seus filtros</div>
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => {
    const interval =
      item.day || item.week || item.month || new Date().toISOString();

    return {
      ...item,
      date: format(parseISO(interval), 'MMM dd', { locale: ptBR }),
      fullDate: interval,
      conversionRate: Number(item.conversionRate),
    };
  });

  //eslint-disable-next-line
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-800">{`Date: ${label}`}</p>
          <p className="text-blue-600">
            {`Taxa de Conversão: ${data.conversionRate}%`}
          </p>
          <p className="text-slate-600">{`Conversões: ${data.totalConverts}`}</p>
          <p className="text-slate-600">{`Total de Envios: ${data.totalSends}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="conversionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="date"
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="conversionRate"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#conversionGradient)"
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{
              r: 6,
              stroke: '#3B82F6',
              strokeWidth: 2,
              fill: '#FFFFFF',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center">
        <p className="text-sm text-slate-600">
          Mostrando {data.length} pontos de dados de{' '}
          {format(
            parseISO(
              data[0]?.day ??
                data[0]?.week ??
                data[0]?.month ??
                new Date().toISOString(),
            ),
            'dd MMM yyyy',
            { locale: ptBR },
          )}{' '}
          até{' '}
          {format(
            parseISO(
              data[data.length - 1]?.day ??
                data[data.length - 1]?.week ??
                data[data.length - 1]?.month ??
                new Date().toISOString(),
            ),
            'dd MMM yyyy',
            { locale: ptBR },
          )}
        </p>
      </div>
    </div>
  );
};
