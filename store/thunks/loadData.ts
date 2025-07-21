import { createAsyncThunk } from '@reduxjs/toolkit'
import monthlyData from '../datasets/monthly.json'
import quarterlyData from '../datasets/quarterly.json'
import yearlyData from '../datasets/yearly.json'

export const loadDashboardData = createAsyncThunk(
  'dashboard/loadData',
  async (period: 'monthly' | 'quarterly' | 'yearly') => {
    switch (period) {
      case 'monthly':
        return { period, data: monthlyData }
      case 'quarterly':
        return { period, data: quarterlyData }
      case 'yearly':
        return { period, data: yearlyData }
    }
  }
)
