import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const viewMode = createSlice({
  name: 'viewMode',
  initialState: 'monthly' as 'monthly' | 'quarterly' | 'yearly',
  reducers: {
    setViewMode: (
      _,
      action: PayloadAction<'monthly' | 'quarterly' | 'yearly'>
    ) => action.payload
  }
})

export const { setViewMode } = viewMode.actions
export default viewMode.reducer
