import { createSlice } from '@reduxjs/toolkit'

let userToken = null
if (typeof window !== 'undefined') {
  // Perform localStorage action
  userToken = localStorage.getItem('tokenRequest')
    ? localStorage.getItem('tokenRequest')
    : null
}

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userToken, // for storing the JWT
  error: null,
  isRemember: false,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
    setToken: (state, { payload }) => {
      state.userToken = payload
    },
    logout: (state) => {
      state.userInfo = null
    },
  },
  extraReducers: {},
})
export const { logout, setCredentials, setToken } = authSlice.actions
export default authSlice.reducer
