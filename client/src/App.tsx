import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Navbar from "./components/custom/Navbar";
import Jobs from "./features/jobs/Jobs";
import { useEffect } from "react";
import axios from "axios";
import SavedJob from "./features/savedJob/SavedJob";
import UserProtected from "./components/wrapper/UserProtected";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  fetchUserData,
  selectAuthLoading,
  selectIsLoggedIn,
} from "./features/auth/authSlice";
import AdminProtected from "./components/wrapper/AdminProtected";
import { CompanyTab } from "./features/company/CompanyTab";
import Profile from "./features/profile/Profile";
import Education from "./features/education/Education";
import Experience from "./features/experience/Experience";
import Personal from "./features/personal/Personal";
import Post from "./features/post/Post";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import logo from "@/assets/banner3.png";
import { Loader } from "lucide-react";
import { BASE_URL } from "./lib/constants";
import AppliedJob from "./features/appliedJobs/AppliedJob";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message == "Invaid Token"
    ) {
      // Handle token expiration or unauthorized access

      localStorage.removeItem("token"); // Clear the token
      window.location.href = "/"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const token = localStorage.getItem("token");

  const getApplication = async () => {
    const { data } = await axios.get(BASE_URL + "/jobapplication");
    console.log(data);
  };

  useEffect(() => {
    dispatch(fetchUserData(token));
    getApplication();
  }, [dispatch, token, isLoggedIn]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center">
        <div className="flex flex-col items-center mt-32">
          <img src={logo} alt="" className="dark:invert w-72" />
          <p className="text-muted-foreground mb-2">
            Hang on we are getting cool jobs for you{" "}
          </p>
          <div className="flex gap-2 items-center">
            <Loader className="animate-spin" /> Loading . . .
          </div>
        </div>
      </div>
    );
  }
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <>
      <Navbar />
      <div className="px-2">
        <Outlet />
      </div>
    </>
  );
}

const router = createBrowserRouter(
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

export default App;
