import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  authToken: string | null;
  isLoggedin: boolean;
  role: string | null;
  user: {
    id: string;
    email: string;
    name: string;
    hashedPassword: string;
    role: string;
  } | null;
}

const initialState: AuthState = {
  authToken: "",
  isLoggedin: false,
  role: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
