import { Outlet } from "react-router-dom";
import Navbar from "../custom/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="px-2 grow">
        <Outlet />
      </div>
    </div>
  );
}
