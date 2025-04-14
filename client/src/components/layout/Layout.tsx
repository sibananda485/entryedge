import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../custom/Navbar";
import { Bookmark, House, MessageSquare, UserRound } from "lucide-react";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <BootomButtons />
    </div>
  );
}
const items = [
  {
    id: "1",
    label: "Home",
    path: "/",
    icon: House,
  },
  {
    id: "2",
    label: "My jobs",
    path: "/my-jobs",
    icon: Bookmark,
  },
  {
    id: "3",
    label: "Messages",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    id: "4",
    label: "Profile",
    path: "/profile",
    icon: UserRound,
  },
];

function BootomButtons() {
  const { pathname } = useLocation();

  return (
    <div className="sm:hidden sticky bottom-0 bg-muted grid grid-cols-4">
      {items.map((a) => {
        const active = pathname == a.path;
        return (
          <Link
            key={a.id}
            to={a.path}
            className={`flex flex-col items-center py-3 ${
              active && "border-b-4 border-foreground"
            }`}
          >
            <a.icon className={`w-5 ${active && "fill-current"}`} />
            <p className={`text-sm ${active && "font-semibold"}`}>{a.label}</p>
          </Link>
        );
      })}
    </div>
  );
}
