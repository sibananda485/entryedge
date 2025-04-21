import { RootState } from "@/app/store";
import { AppliedJob } from "@/features/candidate/appliedJobs/appliedJobSlice";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApplicant = createAsyncThunk(
  "applicant/fetchApplicant",
  async (id: string) => {
    const response = await axios.get<AppliedJob[]>(
      BASE_URL + `/jobapplication?id=${id}`
    );
    return response.data;
  }
);

export interface ApplicantState {
  loading: boolean;
  error: boolean;
  data: AppliedJob[] | null;
}

const initialState: ApplicantState = {
  data: null,
  loading: true,
  error: false,
};

export const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicant.pending, (state) => {
        state.error = false;
      })
      .addCase(fetchApplicant.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchApplicant.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectApplicantError = (state: RootState) =>
  state.applicants.error;
export const selectApplicantData = (state: RootState) => state.applicants.data;
export const selectApplicantLoading = (state: RootState) =>
  state.applicants.loading;

export default applicantSlice.reducer;
