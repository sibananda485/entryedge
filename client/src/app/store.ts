import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import companyReducer from "../features/company/companySlice";
import experienceReducer from "../features/experience/experienceSlice";
import educationReducer from "../features/education/educationSlice";
import personalReducer from "../features/personal/personalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    experience: experienceReducer,
    education: educationReducer,
    personal: personalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
