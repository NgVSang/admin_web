import { ROLE_NAMES } from "@/constants/value";
import { RootState } from "@/store";
import { ICredential, IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let userToken = null;
if (typeof window !== "undefined") {
  // Perform localStorage action
  userToken = localStorage.getItem("tokenRequest")
    ? localStorage.getItem("tokenRequest")
    : null;
}

export type AuthState = {
  loggedin: boolean;
  user?: IUser;
  credential?: ICredential;
  fcmToken?: string;
  roleName?: any;
};

const initialState: AuthState = {
  loggedin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<ICredential>) => {
      state.loggedin = true;
      state.credential = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.loggedin = true;
      state.user = action.payload;
      state.roleName = action.payload?.Roles?.find(
        (role: any) => role.roleName === ROLE_NAMES.SUPERUSER || role.roleName === ROLE_NAMES.SELLER
      )?.roleName ?? ROLE_NAMES.USER
    },
    logout: (state, action: PayloadAction) => {
      state.loggedin = false;
      state.user = undefined;
      state.credential = undefined;
    },
  },
});

export const authSelector = (state: RootState) => state.auth;
export const { setCredential, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
