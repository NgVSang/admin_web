import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleList: [],
  permissionList: [],
  isLoading: false,
};

const rolesSlice = createSlice({
  name: "role",
  initialState: initialState,
  reducers: {
    getRoleListSuccess: (state, action) => {
      state.roleList = action.payload;
    },
    getPermissionListSuccess: (state, action) => {
      state.permissionList = action.payload;
    },
    getRolePermissionPending: (state, action) => {
        state.isLoading = true;
    },
  },
});

export const productSelector = (state: RootState) => state.product;

export const {
  getRoleListSuccess,
  getPermissionListSuccess,
  getRolePermissionPending
} = rolesSlice.actions;
export default rolesSlice.reducer;
