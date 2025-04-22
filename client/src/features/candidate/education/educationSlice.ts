import { RootState } from "@/app/store";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  isPursuing: boolean;
  endDate?: Date;
  description?: string;
}

export const fetchEducationData = createAsyncThunk(
  "education/fetchEducationData",
  async (id?: string) => {
    if (!id) {
      const response = await axios.get<Education[]>(BASE_URL + "/education");
      return response.data;
    } else {
      const response = await axios.get<Education[]>(
        BASE_URL + "/education/" + id
      );
      return response.data;
    }
  }
);

export interface EducationState {
  loading: boolean;
  error: boolean;
  data: Education[] | null;
}

const initialState: EducationState = {
  data: null,
  loading: true,
  error: false,
};

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchEducationData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchEducationData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectEducationError = (state: RootState) => state.education.error;
export const selectEducationData = (state: RootState) => state.education.data;
export const selectEducationLoading = (state: RootState) =>
  state.education.loading;

export default educationSlice.reducer;
