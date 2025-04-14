import { RootState } from "@/app/store";
import { JobDetails } from "@/features/jobs/jobSlice";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AppliedJob {
  id: string;
  jobId: string;
  personalDataId: string;
  status: string;
  remarks: string;
  createdAt: string;
  updatedAt: string;
  job: JobDetails;
}

export const fetchAppliedJob = createAsyncThunk(
  "appliedJob/fetchAppliedJob",
  async () => {
    const response = await axios.get<AppliedJob[]>(
      BASE_URL + "/jobapplication"
    );
    return response.data;
  }
);

export const createAppliedJob = createAsyncThunk(
  "appliedJob/createAppliedJob",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post<AppliedJob>(
        BASE_URL + "/jobapplication/" + id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAppliedJob = createAsyncThunk(
  "appliedJob/deleteAppliedJob",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete<AppliedJob[]>(
        BASE_URL + "/jobapplication/" + id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface AppliedJobState {
  loading: boolean;
  error: boolean;
  data: AppliedJob[] | null;
}

const initialState: AppliedJobState = {
  data: null,
  loading: true,
  error: false,
};

export const appliedJobSlice = createSlice({
  name: "appliedJob",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedJob.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAppliedJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchAppliedJob.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createAppliedJob.fulfilled, (state, action) => {
        const sortedData =
          state.data &&
          [...state.data, action.payload].sort((a, b) => {
            return a.createdAt < b.createdAt ? 1 : -1;
          });
        state.data = sortedData;
        state.error = false;
        state.loading = false;
      })
      .addCase(createAppliedJob.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteAppliedJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(deleteAppliedJob.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectAppliedJobError = (state: RootState) =>
  state.appliedJob.error;
export const selectAppliedJobData = (state: RootState) => state.appliedJob.data;
export const selectAppliedJobLoading = (state: RootState) =>
  state.appliedJob.loading;

export default appliedJobSlice.reducer;
