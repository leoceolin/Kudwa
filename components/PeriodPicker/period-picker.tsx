import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setViewMode } from '@/store/slices/viewMode'
import { VIEW_MODES } from '@/consts'

export function PeriodPicker() {
  const dispatch = useAppDispatch()
  const viewMode = useAppSelector((state) => state.viewMode)

  return (
    <div className="flex items-center gap-4 justify-center">
      Select a period
      <Select
        value={viewMode}
        onValueChange={(val) => {
          dispatch(setViewMode(val as 'monthly' | 'quarterly' | 'yearly'))
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a period" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Period</SelectLabel>
            {VIEW_MODES.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
