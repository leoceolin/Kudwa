'use client'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { DualDonutChart } from '../DualDonutChart/dual-donut'

const COLORS = ['#B09280', '#EAE62F', '#698AC5', '#262626', '#FBFAFA']

export function ChartRenderer({
  chartType,
  data,
  series
}: {
  chartType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  series: { name: string; values: number }[]
}) {
  switch (chartType) {
    case 'line':
      return (
        <ResponsiveContainer width={800} height={500}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />

            <YAxis
              orientation="left"
              tickCount={10}
              yAxisId="left"
              tickFormatter={(val) =>
                val >= 1_000_000
                  ? `${(val / 1_000_000).toFixed(1)}M`
                  : val >= 1000 || val <= -1000
                  ? `${(val / 1000).toFixed(0)}k`
                  : val
              }
            />

            <Tooltip
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString('en-US', {
                  minimumFractionDigits: 2
                })}`,
                name
              ]}
            />
            <Legend />

            {series.map((s, idx) => {
              const isHighValue = ['Cash', 'Fixed Assets'].includes(s.name)
              return (
                <Line
                  key={s.name}
                  yAxisId={isHighValue ? 'left' : 'right'}
                  type="monotone"
                  dataKey={s.name}
                  stroke={COLORS[idx % COLORS.length]}
                  strokeWidth={isHighValue ? 2.5 : 1.5}
                  strokeDasharray={isHighValue ? undefined : '4 4'}
                  dot={false}
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      )

    case 'bar':
    case 'columnStacked':
      return (
        <ResponsiveContainer width={800} height={500}>
          <BarChart
            data={data}
            stackOffset={chartType === 'columnStacked' ? 'sign' : 'none'}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              domain={['auto', 'auto']}
              allowDataOverflow={true}
              tickCount={10}
              tickFormatter={(val) =>
                val >= 1_000_000
                  ? `${(val / 1_000_000).toFixed(1)}M`
                  : val >= 1000 || val <= -1000
                  ? `${(val / 1000).toFixed(0)}k`
                  : val
              }
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString('en-US', {
                  minimumFractionDigits: 2
                })}`,
                name
              ]}
            />
            <Legend />
            {series.map((s, idx) => (
              <Bar
                key={s.name}
                dataKey={s.name}
                fill={COLORS[idx % COLORS.length]}
                stackId={chartType === 'columnStacked' ? 'a' : undefined}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )

    case 'pie':
    case 'donut':
      return <DualDonutChart data={series} />

    default:
      return <p>Chart type not supported: {chartType}</p>
  }
}
