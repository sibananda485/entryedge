import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  fetchUserData,
  selectAuthLoading,
  selectIsLoggedIn,
} from "./features/auth/authSlice";
import logo from "@/assets/banner3.png";
import { Loader } from "lucide-react";
import { router } from "./Routes";
import "@/lib/axios";
// 8093835641
function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchUserData(token));
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

export default App;
