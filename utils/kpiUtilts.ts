export type KPIEntry = {
  name: string
  value: number
  date?: string
  mom?: number
  mOm?: number
  prefix?: string
  type?: string
}

export type FormattedKPI = {
  name: string
  value: number | string
  variation?: string
  variationType?: 'positive' | 'negative' | 'neutral'
}

export function formatKPIs(kpis: KPIEntry[]): FormattedKPI[] {
  return kpis.map((kpi) => {
    const { name, value, mom, mOm, prefix, date, type } = kpi

    const variationRaw = mom ?? mOm
    const variation =
      variationRaw !== undefined
        ? `${prefix ?? ''}${prefix ? ': ' : ''}${variationRaw.toFixed(2)}%`
        : undefined

    const variationType =
      variationRaw === undefined
        ? undefined
        : variationRaw > 0
        ? 'positive'
        : variationRaw < 0
        ? 'negative'
        : 'neutral'

    return {
      name,
      value: value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      variation,
      variationValue: variationRaw,
      variationType,
      date,
      type
    }
  })
}
