import AdminProtected from "./components/wrapper/AdminProtected";
import { CompanyTab } from "./features/recruiter/company/CompanyTab";
import Profile from "./features/profile/Profile";
import Education from "./features/candidate/education/Education";
import Experience from "./features/candidate/experience/Experience";
import Personal from "./features/personal/Personal";
import Post from "./features/recruiter/post/Post";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import AuthProtected from "./components/wrapper/AuthProtected";
import Chat from "./features/chats/Chat";
import Room from "./features/chats/Room";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Jobs from "./features/jobs/Jobs";
import { createBrowserRouter } from "react-router-dom";
import UserProtected from "./components/wrapper/UserProtected";
import SavedJob from "./features/candidate/savedJob/SavedJob";
import Layout from "./components/layout/Layout";
import { MyJobs } from "./tabs/MyJobs";
import AppliedJob from "./features/candidate/appliedJobs/AppliedJob";
import Applicants from "./features/recruiter/applicant/Applicants";
import MyJobsTable from "./features/recruiter/myJobsTable/MyJobsTable";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Jobs />,
        },
        {
          path: "/my-application",
          element: (
            <UserProtected>
              <AppliedJob />
            </UserProtected>
          ),
        },
        {
          path: "/my-jobs",
          element: (
            <AuthProtected>
              <MyJobs />
            </AuthProtected>
          ),
        },
        {
          path: "/saved",
          element: (
            <UserProtected>
              <SavedJob />
            </UserProtected>
          ),
        },
        {
          path: "/post",
          element: (
            <AdminProtected>
              <Post />
            </AdminProtected>
          ),
        },
        {
          path: "/my-jobs",
          element: (
            <AdminProtected>
              <MyJobsTable />
            </AdminProtected>
          ),
        },
        {
          path: "/company",
          element: (
            <AdminProtected>
              <CompanyTab />
            </AdminProtected>
          ),
        },
        {
          path: "/profile",
          element: (
            <UserProtected>
              <Profile />
            </UserProtected>
          ),
        },
        {
          path: "/profile/:id",
          element: (
            <AdminProtected>
              <Profile />
            </AdminProtected>
          ),
        },
        {
          path: "/personal",
          element: (
            <UserProtected>
              <Personal />
            </UserProtected>
          ),
        },
        {
          path: "/education",
          element: (
            <UserProtected>
              <Education />
            </UserProtected>
          ),
        },
        {
          path: "/education/:id",
          element: (
            <AdminProtected>
              <Education />
            </AdminProtected>
          ),
        },
        {
          path: "/experience",
          element: (
            <UserProtected>
              <Experience />
            </UserProtected>
          ),
        },
        {
          path: "/experience/:id",
          element: (
            <AdminProtected>
              <Experience />
            </AdminProtected>
          ),
        },
        {
          path: "/applicant/:id",
          element: (
            <AdminProtected>
              <Applicants />
            </AdminProtected>
          ),
        },
        {
          path: "/chat",
          element: (
            <AuthProtected>
              <Chat />
            </AuthProtected>
          ),
          children: [
            {
              path: "/chat/:id",
              element: <Room />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
    },
  }
);
