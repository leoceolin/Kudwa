import { PieLabelRenderProps } from 'recharts'

const RADIAN = Math.PI / 180

export function CustomDonutLabel({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  index,
  name
}: PieLabelRenderProps & { name: string }) {
  if (percent < 0.02) return null

  const radius = outerRadius + 40
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  const words = name.split(' ')
  const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ')
  const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ')

  const labelYOffset = index * 1.5

  return (
    <text
      className="text-inherit"
      x={x}
      y={y + labelYOffset}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      <tspan x={x} dy="-0.6em">
        {firstLine}
      </tspan>
      <tspan x={x} dy="1.2em">
        {secondLine}
      </tspan>
    </text>
  )
}
