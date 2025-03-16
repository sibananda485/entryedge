import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/Toggle";
import { Bell, MessageSquareText } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { selectIsLoggedIn, selectRole } from "@/features/auth/authSlice";
import { navData } from "@/lib/constants";
import { ProfileDD } from "./ProfileDD";
import logo from "@/assets/logo3.png";

const Navbar = () => {
  const { pathname } = useLocation();
  const role = useAppSelector(selectRole);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const filteredNavData = navData.filter((item) =>
    item.access.some((a) => a == role)
  );
  return (
    <header className="px-2 sm:px-0 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center sm:px-10">
        <div className="flex items-center">
          <Link to="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
            <img src={logo} alt="" className="h-10 w-10 dark:invert" />

            <span className="font-bold text-lg">EntryEdge</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-4 lg:gap-6">
            {isLoggedIn ? (
              filteredNavData.map((a, i) => (
                <Link
                  key={i}
                  to={a.path}
                  className={cn(
                    "transition-colors text-sm hover:text-foreground/80",
                    pathname == a.path
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {a.label}
                </Link>
              ))
            ) : (
              <>
                <Link
                  to="/"
                  className={cn(
                    "transition-colors text-sm hover:text-foreground/80",
                    pathname === "/" ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  Home
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          <nav className=" flex items-center">
            {isLoggedIn ? (
              <>
                <Link className="hidden sm:block" to="/chat">
                  <Button variant="ghost" size="icon">
                    <MessageSquareText className="fill-current w-10 h-10" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <Link to="/test">
                    <Bell className="fill-current w-10 h-10" />
                  </Link>
                </Button>
                <ProfileDD />
                <ModeToggle />
              </>
            ) : (
              <>
                <ModeToggle />
                <Link to="/login">
                  <Button size="sm" className="ml-3">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
