import AdminProtected from "./components/wrapper/AdminProtected";
import { CompanyTab } from "./features/company/CompanyTab";
import Profile from "./features/profile/Profile";
import Education from "./features/education/Education";
import Experience from "./features/experience/Experience";
import Personal from "./features/personal/Personal";
import Post from "./features/post/Post";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import AppliedJob from "./features/appliedJobs/AppliedJob";
import AuthProtected from "./components/wrapper/AuthProtected";
import Chat from "./features/chats/Chat";
import Room from "./features/chats/Room";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Jobs from "./features/jobs/Jobs";
import { createBrowserRouter } from "react-router-dom";
import UserProtected from "./components/wrapper/UserProtected";
import SavedJob from "./features/savedJob/SavedJob";
import Layout from "./components/layout/Layout";
import { MyJobs } from "./tabs/MyJobs";

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
            <UserProtected>
              <MyJobs />
            </UserProtected>
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
          path: "/applicant",
          element: (
            <AdminProtected>
              <p>Applicant</p>
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
          path: "/experience",
          element: (
            <UserProtected>
              <Experience />
            </UserProtected>
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
