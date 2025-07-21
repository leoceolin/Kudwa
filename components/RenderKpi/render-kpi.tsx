import { ChevronsUp, ChevronsDown } from 'lucide-react'
import { FormattedKPI } from '@/utils/kpiUtilts'

export default function RenderKpi({
  formattedKPIs,
  title
}: {
  formattedKPIs: FormattedKPI[]
  title?: string
}) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2 capitalize text-[var(--info)]">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {formattedKPIs.map((kpi) => (
          <div key={kpi.name} className="p-4 border rounded-md">
            <h4 className="text-sm text-[var(--brown)] font-semibold">
              {kpi.name}
            </h4>
            <p className="text-xl font-semibold">${kpi.value}</p>
            {kpi.variation && (
              <p
                className={`text-sm flex items-center gap-1 ${
                  kpi.variationType === 'positive'
                    ? 'text-green-600'
                    : kpi.variationType === 'negative'
                    ? 'text-red-600'
                    : 'text-[var(--gray)]'
                }`}
              >
                {kpi.variationType === 'positive' ? (
                  <ChevronsUp />
                ) : kpi.variationType === 'negative' ? (
                  <ChevronsDown />
                ) : (
                  ''
                )}
                {kpi.variation}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
