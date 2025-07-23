/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Loader2 } from 'lucide-react'
import { PeriodPicker } from '@/components/PeriodPicker/period-picker'
import { toggleNode } from '@/store/slices/report'
import type { JSX } from 'react'

export default function Reports() {
  const dispatch = useAppDispatch()
  const viewMode = useAppSelector((state) => state.viewMode)
  const data = useAppSelector((state) => state.reportData.data)
  const expandedNodes = useAppSelector((state) => state.reportUI.expandedNodes)

  const isExpanded = (id: string) => expandedNodes.includes(id)
  const toggle = (id: string) => dispatch(toggleNode(id))

  const viewModeKeyMap: Record<typeof viewMode, string> = {
    monthly: 'totalResult',
    quarterly: 'quarterlyResult',
    yearly: 'yearlyResult'
  }

  const selectedKey = viewModeKeyMap[viewMode]

  const renderField = (field: any, depth = 0): JSX.Element | null => {
    const values = field[selectedKey]
    const hasChildren = Array.isArray(field.fields) && field.fields.length > 0

    if ((!Array.isArray(values) || values.length === 0) && !hasChildren)
      return null

    const nodeId = `${field.id}`
    const expanded = isExpanded(nodeId)

    const total = Array.isArray(values)
      ? values.reduce((acc: number, val: number) => acc + val, 0)
      : 0

    const valueColor =
      total > 0
        ? 'text-[var(--green)]'
        : total < 0
        ? 'text-[var(--red)]'
        : 'text-[var(--gray)]'

    return (
      <div
        key={field.id}
        className="space-y-2"
        style={{ marginLeft: depth * 12 }}
      >
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => toggle(nodeId)}
        >
          {hasChildren || Array.isArray(values) ? (
            <span className="text-xs">{expanded ? '▼' : '▶'}</span>
          ) : (
            <span className="text-xs opacity-0">▶</span>
          )}
          <span className="font-medium">{field.name}</span>
          {Array.isArray(values) && (
            <span className={`ml-auto text-sm ${valueColor}`}>
              ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {expanded && Array.isArray(values) && values.length > 0 && (
          <ul className="ml-6 text-sm list-disc text-muted-foreground">
            {values.map((val: number, idx: number) => {
              const itemColor =
                val === 0
                  ? 'text-[var(--gray)]'
                  : val > 0
                  ? 'text-[var(--green)]'
                  : 'text-[var(--red)]'

              return (
                <li key={idx} className={itemColor}>
                  Value {idx + 1}: $
                  {val.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </li>
              )
            })}
          </ul>
        )}

        {expanded && hasChildren && (
          <div className="pl-4 space-y-1">
            {field.fields.map((child: any) => renderField(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  if (!data || !data.reportResult) {
    return (
      <div className="space-y-10 w-full p-4">
        <PeriodPicker />
        <div className="flex justify-center h-full w-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>
    )
  }

  const renderGroup = (sectionTitle: string, groups: any[] | undefined) => {
    if (!groups?.length) return null

    return (
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-2xl font-bold mt-6 mb-4 text-[var(--brown)]">
          {sectionTitle}
        </h1>
        {groups.map((group: any, idx: number) => (
          <div key={idx}>
            <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
            <div className="space-y-1">
              {group.fields
                ? group.fields?.map((field: any) => renderField(field))
                : renderField(group)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-10 w-full p-4">
      <PeriodPicker />
      <div className="flex flex-col gap-6 w-full">
        {renderGroup('Profit & Loss', data.reportResult.profitnLoss)}
        {renderGroup('Computed Fields', data.reportResult.computedFields)}
        <h1 className="text-2xl font-bold mt-6 mb-4 text-[var(--brown)]">
          Metrics
        </h1>
        {renderField(data.reportResult.metrics.pnlKeyMetrics)}
      </div>
    </div>
  )
}
