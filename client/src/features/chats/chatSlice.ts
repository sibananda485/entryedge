import { RootState } from "@/app/store";
import { BASE_URL } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Personal } from "../personal/personalSlice";
import { Messages } from "./Room";
import { Company } from "../recruiter/company/companySlice";

interface CandidateStack extends Personal {
  lastMessage: Messages;
}

interface CompanyStack extends Company {
  lastMessage: Messages;
}

type Chats = CandidateStack & CompanyStack;

export const fetchCandidateStack = createAsyncThunk(
  "chat/fetchCandidateStack",
  async () => {
    const response = await axios.get<Chats[]>(BASE_URL + "/candidate");
    return response.data;
  }
);

export const fetchCompanyStack = createAsyncThunk(
  "chat/fetchCompanyStack",
  async () => {
    const response = await axios.get<Chats[]>(BASE_URL + "/company/all");
    return response.data;
  }
);

export interface ChatsState {
  loading: boolean;
  error: boolean;
  data: Chats[] | null;
}

const initialState: ChatsState = {
  data: null,
  loading: true,
  error: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateLastMessage: (state, action) => {
      const updatedArray = state.data?.map((a) => {
        console.log(a.userId, action.payload.userId);
        if (a.userId == action.payload.userId) {
          return { ...a, lastMessage: action.payload.lastMessage };
        } else {
          return a;
        }
      });

      state.data = updatedArray || null;

      console.log("updatedArray", JSON.parse(JSON.stringify(updatedArray)));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateStack.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCandidateStack.fulfilled, (state, action) => {
        state.data = action.payload.filter((a) => a.lastMessage);
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchCandidateStack.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchCompanyStack.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCompanyStack.fulfilled, (state, action) => {
        state.data = action.payload.filter((a) => a.lastMessage);
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchCompanyStack.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectChatsError = (state: RootState) => state.chats.error;
export const selectChatsData = (state: RootState) => state.chats.data;
export const selectChatsLoading = (state: RootState) => state.chats.loading;
export const { updateLastMessage } = chatSlice.actions;

export default chatSlice.reducer;
