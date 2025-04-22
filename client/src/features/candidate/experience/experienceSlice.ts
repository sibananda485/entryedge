import { RootState } from "@/app/store";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  isCurrent: boolean;
  employmentType: string;
  endDate?: string;
  description?: string;
  industry?: string;
}

export const fetchExperience = createAsyncThunk(
  "experience/fetchExperience",
  async (id?: string) => {
    if (!id) {
      const response = await axios.get<Experience[]>(BASE_URL + "/experience");
      return response.data;
    } else {
      const response = await axios.get<Experience[]>(
        BASE_URL + "/experience/" + id
      );
      return response.data;
    }
  }
);

export interface ExperienceState {
  loading: boolean;
  error: boolean;
  data: Experience[] | null;
}

const initialState: ExperienceState = {
  data: null,
  loading: true,
  error: false,
};

export const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchExperience.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectExperienceError = (state: RootState) =>
  state.experience.error;
export const selectExperienceData = (state: RootState) => state.experience.data;
export const selectExperienceLoading = (state: RootState) =>
  state.experience.loading;

export default experienceSlice.reducer;
