import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderList : [],
    isLoading: false,
};

const ordersSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    getOrderListSuccess: (state, action) => {
      state.orderList = action.payload;
      state.isLoading = false;
    },
    getOrderListPending: (state, action) => {
      state.isLoading = true;
    },
  },
});

export const orderSelector = (state: RootState) => state.order;

export const {
    getOrderListSuccess,
    getOrderListPending,
} = ordersSlice.actions;
export default ordersSlice.reducer;
