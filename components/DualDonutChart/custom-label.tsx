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
  // Guard clause for all required props
  if (
    typeof cx !== 'number' ||
    typeof cy !== 'number' ||
    typeof midAngle !== 'number' ||
    typeof outerRadius !== 'number' ||
    typeof percent !== 'number' ||
    typeof index !== 'number' ||
    typeof name !== 'string' ||
    percent < 0.02
  ) {
    return null
  }

  const radius = outerRadius + 40
  const angle = -midAngle * RADIAN
  const x = cx + radius * Math.cos(angle)
  const y = cy + radius * Math.sin(angle)

  // Split name into two lines
  const words = name.split(' ')
  const mid = Math.ceil(words.length / 2)
  const firstLine = words.slice(0, mid).join(' ')
  const secondLine = words.slice(mid).join(' ')

  return (
    <text
      className="text-inherit"
      x={x}
      y={y + index * 1.5}
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
