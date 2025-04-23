import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import companyReducer from "../features/recruiter/company/companySlice";
import experienceReducer from "../features/candidate/experience/experienceSlice";
import educationReducer from "../features/candidate/education/educationSlice";
import personalReducer from "../features/personal/personalSlice";
import jobReducer from "../features/jobs/jobSlice";
import savedJobReducer from "../features/candidate/savedJob/savedJobSlice";
import appliedJobReducer from "../features/candidate/appliedJobs/appliedJobSlice";
import applicantsReducer from "@/features/recruiter/applicant/applicantSlice";
import chatsReducer from "@/features/chats/chatSlice";

const appReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  experience: experienceReducer,
  education: educationReducer,
  personal: personalReducer,
  job: jobReducer,
  savedJob: savedJobReducer,
  appliedJob: appliedJobReducer,
  applicants: applicantsReducer,
  chats: chatsReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT") {
    state = undefined; // Reset state
  }
  return appReducer(state, action);
};

export default rootReducer;
