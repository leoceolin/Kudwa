import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface CustomLegendProps {
  payload?: {
    value: string
    color: string
    payload: { value: number }
  }[]
}

export function CustomLegend({ payload = [] }: CustomLegendProps) {
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.5rem',
        maxWidth: '100%',
        padding: 0,
        listStyle: 'none',
        marginTop: '1rem',
        textAlign: 'center'
      }}
    >
      {payload.map((entry) => {
        const name = entry.value
        const value = entry.payload.value

        return (
          <Tooltip key={name + value}>
            <TooltipTrigger asChild>
              <span variant="outline">
                <span
                  className="w-3 h-3 rounded-full mr-2 inline-block"
                  style={{
                    backgroundColor: entry.color
                  }}
                />
                {name}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </ul>
  )
}
