import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FilterIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from './date-picker-with-range.component';
import { ConversionChart } from './conversion-chart';
import { useConversionRates } from '@/hooks/useConversionRates';

export interface ConversionRateEvolution {
  data: ConversionData[];
  pagination: {
    totalItems: number;
    limit: number;
    page: number;
  };
}

export interface ConversionData {
  channel: string;
  day: string;
  conversionRate: number;
  totalSends: number;
  totalConverts: number;
}

const ConversionDashboard = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('email');
  const [selectedInterval, setSelectedInterval] = useState<string>('day');

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 1), // 1 de maio de 2025
    to: new Date(2025, 4, 30), // 30 de maio de 2025
  });

  const {
    data: conversionRateEvolution = {
      data: [],
      pagination: { totalItems: 0, limit: 0, page: 0 },
    },
    isLoading,
    refetch,
  } = useConversionRates({
    startDate: dateRange?.from ?? new Date(),
    endDate: dateRange?.to ?? new Date(),
    channel: selectedChannel,
    limit: 100,
  });

  const { data } = conversionRateEvolution;

  console.log(data);

  const averageConversionRate =
    data.length > 0
      ? (
          data.reduce((sum, item) => sum + Number(item.conversionRate), 0) /
          data.length
        ).toFixed(2)
      : '0.00';

  const totalConversions = data.reduce(
    (sum, item) => sum + Number(item.totalConverts),
    0,
  );
  const totalSends = data.reduce((sum, item) => sum + item.totalSends, 0);

  const channels = [
    { value: 'email', label: 'Email' },
    { value: 'wpp', label: 'WhatsApp' },
    { value: 'MOBILE', label: 'Mobile' },
    { value: 'all', label: 'Geral' },
  ];

  const intervals = [
    { value: 'day', label: 'Diário' },
    { value: 'week', label: 'Semanal' },
    { value: 'month', label: 'Mensal' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard de Taxa de Conversão
          </h1>
          <p className="text-xl text-slate-600 capitalize">
            Canal:{' '}
            <span className="font-semibold text-slate-800">
              {channels.find((c) => c.value === selectedChannel)?.label}
            </span>
          </p>
        </div>

        {/* Filtros */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <FilterIcon className="h-5 w-5" />
              Filtros
            </CardTitle>
            <CardDescription>
              Customize o gráfico selecionando o canal e o intervalo de datas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Canal
                </label>
                <Select
                  value={selectedChannel}
                  onValueChange={setSelectedChannel}
                >
                  <SelectTrigger className="bg-white border-slate-200 hover:border-slate-300 transition-colors">
                    <SelectValue placeholder="Selecione um canal" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map((channel) => (
                      <SelectItem key={channel.value} value={channel.value}>
                        {channel.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Intervalo Temporal
                </label>

                <Select
                  value={selectedInterval}
                  onValueChange={setSelectedInterval}
                >
                  <SelectTrigger className="bg-white border-slate-200 hover:border-slate-300 transition-colors">
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    {intervals.map((interval) => (
                      <SelectItem key={interval.value} value={interval.value}>
                        {interval.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Intervalo de Datas
                </label>
                <DatePickerWithRange
                  date={dateRange}
                  setDate={setDateRange}
                  className="bg-white border-slate-200 hover:border-slate-300 transition-colors"
                />
              </div>

              <Button
                onClick={() => refetch()}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? 'Carregando...' : 'Atualizar Dados'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Média da Taxa de Conversão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageConversionRate}%</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total de Conversões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalConversions}</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total de Envios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSends}</div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">
              Evolução da Taxa de Conversão
            </CardTitle>
            <CardDescription>
              Taxa de conversão diária para o canal de{' '}
              {channels.find((c) => c.value === selectedChannel)?.label}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConversionChart data={data} loading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConversionDashboard;
