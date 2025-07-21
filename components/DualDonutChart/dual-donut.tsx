'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { CustomDonutLabel } from './custom-label'
import { CustomLegend } from './custom-legend'

const COLORS = [
  '#B09280',
  '#EAE62F',
  '#698AC5',
  '#262626',
  '#C07F9E',
  '#60C9A6',
  '#FF6B6B',
  '#4ECDC4',
  '#556270',
  '#C7F464',
  '#FFA07A',
  '#6A0572',
  '#F67280',
  '#355C7D',
  '#99B898',
  '#F8B195',
  '#E84A5F',
  '#2A363B',
  '#3FB8AF',
  '#FFB347'
]

export function DualDonutChart({
  data
}: {
  data: { name: string; values: number }[]
}) {
  const positiveData = data
    .filter((item) => item.values > 0)
    .map((item) => ({ name: item.name, value: item.values }))

  const negativeData = data
    .filter((item) => item.values < 0)
    .map((item) => ({ name: item.name, value: Math.abs(item.values) }))

  return (
    <div className="flex flex-col flex-wrap w-full justify-center gap-8">
      <div className="w-full ">
        <h3 className="text-center mb-4 text-lg font-medium text-[var(--info)]">
          Positive Values
        </h3>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Tooltip
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString('en-US', {
                  minimumFractionDigits: 2
                })}`,
                name
              ]}
            />
            <Legend
              content={<CustomLegend />}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
            <Pie
              data={positiveData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={60}
              label={(props) => (
                <CustomDonutLabel {...props} name={props.name as string} />
              )}
            >
              {positiveData.map((_, idx) => (
                <Cell key={`pos-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {negativeData.length > 0 && (
        <div className="w-full ">
          <h3 className="text-center mb-4 text-lg font-medium text-[var(--destructive)]">
            Negative Values
          </h3>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `- $${value.toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  })}`,
                  name
                ]}
              />
              {/* <Legend /> */}
              <Legend content={<CustomLegend />} />
              <Pie
                data={negativeData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                innerRadius={60}
                label={(props) => (
                  <CustomDonutLabel {...props} name={props.name as string} />
                )}
              >
                {negativeData.map((_, idx) => (
                  <Cell key={`neg-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
