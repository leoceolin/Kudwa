import { configureStore } from '@reduxjs/toolkit'
import viewModeReducer from './slices/viewMode'
import dashboardReducer from './slices/dashboard'
import reportUIReducer from './slices/report'

export const store = configureStore({
  reducer: {
    viewMode: viewModeReducer,
    dashboard: dashboardReducer,
    reportUI: reportUIReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
