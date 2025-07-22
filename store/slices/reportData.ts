/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import reportData from '../datasets/report.json'

export type ReportView = 'monthly' | 'quarterly' | 'yearly'

interface ReportState {
  data: any
}

const initialState: ReportState = {
  data: reportData
}

const reportSlice = createSlice({
  name: 'reportData',
  initialState,
  reducers: {
    setReportData(state, action: PayloadAction<any>) {
      state.data = action.payload
    }
  }
})

export const { setReportData } = reportSlice.actions
export default reportSlice.reducer
