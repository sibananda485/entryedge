import { RootState } from "@/app/store";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TokenRes {
  email: string;
  name: string;
  id: string;
  role: string;
}

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (token: string | null, { rejectWithValue }) => {
    if (!token) return null;

    try {
      const response = await axios.get<TokenRes>(BASE_URL + "/auth/token");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  }
);

export interface AuthState {
  isLoggedin: boolean;
  loading: boolean;
  error: boolean;
  role: string | null;
  user: User | null;
}
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const initialState: AuthState = {
  loading: true,
  isLoggedin: false,
  error: false,
  role: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedin = true;
      state.role = action.payload.role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const userData = action.payload;
        if (userData) {
          state.loading = false;
          state.isLoggedin = true;
          state.error = false;
          state.role = userData.role;
          state.user = userData;
        } else {
          state.loading = false;
          state.isLoggedin = false;
          state.error = false;
          state.role = null;
          state.user = null;
        }
      })
      .addCase(fetchUserData.rejected, (state) => {
        localStorage.removeItem("token");
        state.loading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export const selectRole = (state: RootState) => state.auth.role;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedin;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectEmail = (state: RootState) => state.auth.user?.email;

export default authSlice.reducer;
