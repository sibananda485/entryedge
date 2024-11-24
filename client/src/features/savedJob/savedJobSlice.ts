import { RootState } from "@/app/store";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Job as SavedJob } from "../jobs/jobSlice";

export const fetchSavedJob = createAsyncThunk(
  "savedJob/fetchSavedJob",
  async () => {
    const response = await axios.get<SavedJob[]>(BASE_URL + "/saved-job");
    return response.data;
  }
);

export const createSavedJob = createAsyncThunk(
  "savedJob/createSavedJob",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post<SavedJob[]>(
        BASE_URL + "/saved-job/" + id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSavedJob = createAsyncThunk(
  "savedJob/deleteSavedJob",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete<SavedJob[]>(
        BASE_URL + "/saved-job/" + id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface SavedJobState {
  loading: boolean;
  error: boolean;
  data: SavedJob[] | null;
}

const initialState: SavedJobState = {
  data: null,
  loading: true,
  error: false,
};

export const savedJobSlice = createSlice({
  name: "savedJob",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedJob.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSavedJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchSavedJob.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createSavedJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(createSavedJob.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteSavedJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(deleteSavedJob.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectSavedJobError = (state: RootState) => state.savedJob.error;
export const selectSavedJobData = (state: RootState) => state.savedJob.data;
export const selectSavedJobLoading = (state: RootState) =>
  state.savedJob.loading;

export default savedJobSlice.reducer;
