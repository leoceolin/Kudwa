/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loadDashboardData } from '../thunks/loadData'

interface DashboardState {
  monthly: any
  quarterly: any
  yearly: any
}

const initialState: DashboardState = {
  monthly: null,
  quarterly: null,
  yearly: null
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData(
      state,
      action: PayloadAction<{ period: keyof DashboardState; data: any }>
    ) {
      const { period, data } = action.payload
      state[period] = data
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadDashboardData.fulfilled, (state, action) => {
      const { period, data } = action.payload
      state[period] = data
    })
  }
})

export const { setDashboardData } = dashboardSlice.actions
export default dashboardSlice.reducer
