export function formatTimeSeriesData(
  dateArray: string[],
  series: { name: string; values: number[] }[]
) {
  return dateArray.map((date, idx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row: Record<string, any> = { date }
    series.forEach((s) => {
      row[s.name] = s.values[idx]
    })
    return row
  })
}

export function formatSingleSeries(
  series: { name: string; values: number | number[] }[]
) {
  return series.map((item) => ({
    name: item.name,
    value: typeof item.values === 'number' ? item.values : item.values[0] ?? 0
  }))
}
