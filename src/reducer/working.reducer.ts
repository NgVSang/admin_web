import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  working: {},
  user:{
    name: '',
    phoneNumber: ''
  },
  attendances: []
}

const workingSlice = createSlice({
  name: 'working',
  initialState,
  reducers: {
    setAttendancesInfor: (state, { payload }) => {
        state.attendances = payload
    },
  },
  extraReducers: {},
})
export const { setAttendancesInfor } = workingSlice.actions
export default workingSlice.reducer
