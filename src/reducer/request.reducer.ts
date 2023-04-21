import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  requests: [],
  totalItem: 0,
}

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setListRequest: (state, { payload }) => {
        state.requests = payload.requests
        state.totalItem = payload.totalItem
    },
  },
  extraReducers: {},
})
export const { setListRequest } = requestSlice.actions
export default requestSlice.reducer
