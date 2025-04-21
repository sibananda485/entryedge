import { RootState } from "@/app/store";
import { TokenRes } from "@/features/auth/authSlice";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Personal {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  country: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  resume: string;
  resumeFileName: string;
  resumeUpdatedAt: string;
  User: TokenRes;
}

export const fetchPersonalData = createAsyncThunk(
  "personal/fetchPersonalData",
  async () => {
    const response = await axios.get<Personal>(BASE_URL + "/personal");
    return response.data;
  }
);

export interface PersonalState {
  loading: boolean;
  error: boolean;
  data: Personal | null;
}

const initialState: PersonalState = {
  data: null,
  loading: true,
  error: false,
};

export const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPersonalData.fulfilled, (state, action) => {
        state.data = action.payload || null;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchPersonalData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectPersonalError = (state: RootState) => state.personal.error;
export const selectPersonalData = (state: RootState) => state.personal.data;
export const selectPersonalLoading = (state: RootState) =>
  state.personal.loading;

export default personalSlice.reducer;
