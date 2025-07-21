'use client'
import { ChartRenderer } from '@/components/RenderChart/render-chart'
import { formatTimeSeriesData, formatSingleSeries } from '@/utils/chartUtils'
import { splitCamelCase } from '@/utils/splitCamelCase'
import { formatKPIs } from '@/utils/kpiUtilts'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { loadDashboardData } from '@/store/thunks/loadData'
import RenderKpi from '@/components/RenderKpi/render-kpi'
import { PeriodPicker } from '@/components/PeriodPicker/period-picker'
import { VIEW_MODES } from '@/consts'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const viewMode = useAppSelector((state) => state.viewMode)
  const data = useAppSelector((state) => state.dashboard[viewMode])

  useEffect(() => {
    if (!data) {
      setLoading(true)
      dispatch(loadDashboardData(viewMode)).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [dispatch, viewMode, data])

  const { mainDashboard, mainDashboardKPIs } = data || {}
  const { dateArray = [], charts = {} } = mainDashboard || {}
  const { topKPIs = [], KPIs = [] } = mainDashboardKPIs || {}

  const formattedTopKPIs = useMemo(() => formatKPIs(topKPIs), [topKPIs])
  const formattedPeriodKPIs = useMemo(() => formatKPIs(KPIs), [KPIs])

  return (
    <div className="space-y-10 w-full p-4">
      <PeriodPicker />

      {loading || !data ? (
        <div className="flex justify-center h-full w-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5">
          {Object.entries(charts).map(([key, chartGroup]) => {
            if (!Array.isArray(chartGroup)) return null
            const filteredGroup = chartGroup.filter(Boolean)
            if (filteredGroup.length === 0) return null

            const chartType = filteredGroup[0].chartType
            const formattedData = ['line', 'bar', 'columnStacked'].includes(
              chartType
            )
              ? formatTimeSeriesData(dateArray, filteredGroup)
              : formatSingleSeries(filteredGroup)

            return (
              <div
                key={key}
                className="flex flex-col items-center justify-center w-full"
              >
                <h2 className="text-xl font-semibold mb-2 capitalize text-[var(--brown)]">
                  {splitCamelCase(key)}
                </h2>
                <ChartRenderer
                  chartType={chartType}
                  data={formattedData}
                  series={filteredGroup}
                />
              </div>
            )
          })}

          <RenderKpi formattedKPIs={formattedTopKPIs} title="Top KPIs" />
          <RenderKpi
            formattedKPIs={formattedPeriodKPIs}
            title={VIEW_MODES.find((mode) => mode.value === viewMode)?.kpiLabel}
          />
        </div>
      )}
    </div>
  )
}
