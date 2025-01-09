import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import companyReducer from "../features/company/companySlice";
import experienceReducer from "../features/experience/experienceSlice";
import educationReducer from "../features/education/educationSlice";
import personalReducer from "../features/personal/personalSlice";
import jobReducer from "../features/jobs/jobSlice";
import savedJobReducer from "../features/savedJob/savedJobSlice";
import appliedJobReducer from "../features/appliedJobs/appliedJobSlice";

const appReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    experience: experienceReducer,
    education: educationReducer,
    personal: personalReducer,
    job: jobReducer,
    savedJob: savedJobReducer,
    appliedJob: appliedJobReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    state = undefined; // Reset state
  }
  return appReducer(state, action);
};

export default rootReducer;