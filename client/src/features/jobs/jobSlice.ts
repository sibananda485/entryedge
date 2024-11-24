import { RootState } from "@/app/store";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Job {
  id: string;
  deadline: string;
  companyId: string;
  location: string;
  skills: string;
  salaryMax: string;
  salaryMin: string;
  employmentType: string;
  title: string;
  Company: Company;
}

export interface JobDetails {
  id: string;
  title: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  employmentType: string;
  workHour: string;
  education: string;
  deadline: string;
  skills: string;
  jd: string;
  qualification: string;
  responsibilities: string;
  createdAt: string;
  updatedAt: string;
  companyId: string;
  Company: Company;
}

interface Company {
  bio: string;
  website: string;
  name: string;
  industry: string;
}

export const fetchJobData = createAsyncThunk("job/fetchJobData", async () => {
  const response = await axios.get<Job[]>(BASE_URL + "/job");
  return response.data;
});

export const fetchJobDataById = createAsyncThunk(
  "job/fetchJobDataById",
  async (id: string) => {
    const response = await axios.get<JobDetails>(BASE_URL + "/job/" + id);
    return response.data;
  }
);

export interface JobState {
  loading: boolean;
  error: boolean;
  loadingById: boolean;
  errorById: boolean;
  data: Job[] | null;
  dataById: JobDetails | null;
  id: string | null;
}

const initialState: JobState = {
  data: null,
  dataById: null,
  loadingById: true,
  errorById: false,
  loading: true,
  error: false,
  id: null,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchJobData.fulfilled, (state, action) => {
        state.data = action.payload;
        if (action.payload.length > 0) {
          state.id = action.payload[0].id;
        }
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchJobData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchJobDataById.pending, (state) => {
        state.loadingById = true;
        state.errorById = false;
      })
      .addCase(fetchJobDataById.fulfilled, (state, action) => {
        state.dataById = action.payload;
        state.id = action.payload.id;
        state.errorById = false;
        state.loadingById = false;
      })
      .addCase(fetchJobDataById.rejected, (state) => {
        state.loadingById = false;
        state.errorById = true;
      });
  },
});

export const selectJobError = (state: RootState) => state.job.error;
export const selectJobData = (state: RootState) => state.job.data;
export const selectJobLoading = (state: RootState) => state.job.loading;
export const selectJobErrorById = (state: RootState) => state.job.errorById;
export const selectJobDataById = (state: RootState) => state.job.dataById;
export const selectJobLoadingById = (state: RootState) => state.job.loadingById;
export const selectJobSelectedId = (state: RootState) => state.job.id;

export default jobSlice.reducer;
