import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ReportUIState {
  expandedNodes: string[]
}

const initialState: ReportUIState = {
  expandedNodes: []
}

const reportUI = createSlice({
  name: 'reportUI',
  initialState,
  reducers: {
    expandNode(state, action: PayloadAction<string>) {
      if (!state.expandedNodes.includes(action.payload)) {
        state.expandedNodes.push(action.payload)
      }
    },
    collapseNode(state, action: PayloadAction<string>) {
      state.expandedNodes = state.expandedNodes.filter(
        (id) => id !== action.payload
      )
    },
    toggleNode(state, action: PayloadAction<string>) {
      if (state.expandedNodes.includes(action.payload)) {
        state.expandedNodes = state.expandedNodes.filter(
          (id) => id !== action.payload
        )
      } else {
        state.expandedNodes.push(action.payload)
      }
    }
  }
})

export const { expandNode, collapseNode, toggleNode } = reportUI.actions
export default reportUI.reducer
