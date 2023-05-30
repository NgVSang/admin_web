import { createSlice } from '@reduxjs/toolkit'

export enum ApplicationModal {
  MENU,
  SIGNUP_VIEW,
  LOGIN_VIEW,
  LOGOUT_VIEW,
  FORGOT_VIEW,
  DELETE_USER_VIEW,
  UPDATE_PROFILE_VIEW,
  UPDATE_REQUEST_STATUS_VIEW,
  CHANGE_PASSWORD_USER_VIEW,
  DETAIL_WORKING_VIEW,
  ADD_REQUEST_TYPE,
  TRAINING_FACE,
  UPDATE_SALARY_VIEW,
  DETAIL_USER_VIEW,
  UPDATE_USER_VIEW,
  ADD_CUSTOMER_VIEW,
  EDIT_PROFILE_VIEW,
  CHANGE_PASSWORD_VIEW,
  ADMIN_CHANGE_PASSWORD_VIEW,
  DELETE_PRODUCT_VIEW,
  DELETE_BATCH_VIEW,
  UPDATE_PRODUCT_VIEW,
  UPDATE_BATCH_VIEW,
  DETAIL_BATCH_VIEW,
  NEW_SHIPPING_ADDRESS,
  NEW_PAYMENT_METHOD,
  ADD_CONSIGNEE_VIEW,
  DELETE_CONSIGNEE_VIEW,
  UPDATE_CONSIGNEE_VIEW,
  DETAIL_CONSIGNEE_VIEW,
  ADD_BATCH_VIEW,
  EDIT_BATCH_VIEW,
  DELETE_NOTIFICATION_VIEW,
  DETAIL_NOTIFICATION_VIEW,
  DETAIL_TRANSACTION_VIEW,
  EDIT_ADMINISTRATOR_VIEW,
  EDIT_ADMINISTRATOR_INFO_VIEW,
  ADD_USER_VIEW,
  ADD_USER_IMAGES_TRAINING,
  OTP_VIEW,
}

export enum ApplicationSideBar {
  CART_VIEW,
  SHIPPING_VIEW,
  PAYMENT_VIEW,
  MOBILE_MENU_VIEW,
  CHECKOUT_VIEW,
}

export interface ApplicationState {
  readonly openModal: ApplicationModal | null
  data: any
  openSideBar: ApplicationSideBar | null
  filter: any
  config: any
}

const initialState: ApplicationState = {
  openModal: null,
  openSideBar: null,
  data: null,
  filter: {},
  config: {
    fee: 0,
    margin: 0,
  },
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
    setToggleSidebar(state, action) {
      state.openSideBar = action.payload
    },
    setData(state, action) {
      state.data = action.payload
    },
    setFilter(state, action) {
      state.filter[action.payload.key] = action.payload.value
    },
    setConfig(state, action) {
      state.config[action.payload.key] = Number(action.payload.value)
    },
    clearFilter(state) {
      state.filter = {}
    },
  },
})

export const {
  setOpenModal,
  setData,
  setToggleSidebar,
  setFilter,
  clearFilter,
  setConfig,
} = applicationSlice.actions

export default applicationSlice.reducer
