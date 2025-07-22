import { configureStore } from '@reduxjs/toolkit'
import viewModeReducer from './slices/viewMode'
import dashboardReducer from './slices/dashboard'
import reportUIReducer from './slices/report'
import reportDataReducer from './slices/reportData'

export const store = configureStore({
  reducer: {
    viewMode: viewModeReducer,
    dashboard: dashboardReducer,
    reportUI: reportUIReducer,
    reportData: reportDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
