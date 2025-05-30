import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: string;
  token?: string;
}

interface AuthState {
  userInfo: UserInfo | null;
  
}

const initialState: AuthState = {
  userInfo: typeof window !== "undefined" && localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
