import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  categoryList: [],
  productDetailsCurrent: null,
  isLoading: false,
};

const productsSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    getProductListSuccess: (state, action) => {
      state.productList = action.payload.products;
      state.categoryList = action.payload.categories;
      state.isLoading = false;
    },
    getProductDetailsSuccess: (state, action) => {
      state.productDetailsCurrent = action.payload;
      state.isLoading = false;
    },
    getProductPending: (state, action) => {
      state.isLoading = true;
    },
  },
});

export const productSelector = (state: RootState) => state.product;

export const {
  getProductListSuccess,
  getProductDetailsSuccess,
  getProductPending,
} = productsSlice.actions;
export default productsSlice.reducer;
