import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Navbar from "./components/custom/Navbar";
import Jobs from "./features/jobs/Jobs";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const token = localStorage.getItem("token");
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/company", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Jobs />
        </>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
