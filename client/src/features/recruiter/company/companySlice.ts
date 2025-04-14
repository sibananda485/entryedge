import { RootState } from "@/app/store";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Company {
  id: string;
  name: string;
  industry: string;
  bio: string;
  website: string;
  linkedIn: string;
  instagram: string;
  zip: string;
  country: string;
  city: string;
  state: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
  startDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchCompanyData = createAsyncThunk(
  "company/fetchCompanyData",
  async () => {
    const response = await axios.get<Company>(BASE_URL + "/company");
    return response.data;
  }
);

export interface CompanyState {
  loading: boolean;
  error: boolean;
  data: Company | null;
}

const initialState: CompanyState = {
  data: null,
  loading: true,
  error: false,
};

export const companySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCompanyData.fulfilled, (state, action) => {
        state.data = action.payload || null;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchCompanyData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectCompanyError = (state: RootState) => state.company.error;
export const selectCompanyData = (state: RootState) => state.company.data;
export const selectCompanyLoading = (state: RootState) => state.company.loading;

export default companySlice.reducer;
