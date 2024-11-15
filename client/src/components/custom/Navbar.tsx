import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/Toggle";
import { Bell, Handshake, MessageSquareText, User } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-5">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
            <Handshake className="h-6 w-6 " />
            <span className="hidden font-bold text-lg lg:inline-block">
              EntryEdge
            </span>
          </Link>
          <nav className="flex items-center gap-4 lg:gap-6">
            <Link
              to="/"
              className={cn(
                "transition-colors text-sm hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Home
            </Link>
            <Link
              to="/my-application"
              className={`transition-colors text-sm  hover:text-foreground/80 ${
                pathname === "/my-application"
                  ? "text-foreground"
                  : "text-foreground/60"
              } `}
            >
              My Application
            </Link>
            <Link
              to="/saved"
              className={`transition-colors text-sm  hover:text-foreground/80 ${
                pathname === "/saved" ? "text-foreground" : "text-foreground/60"
              } `}
            >
              Saved
            </Link>
          </nav>
        </div>
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div> */}
          <nav className="flex items-center">
            <Button variant="ghost" size="icon">
              <Link to="/test">
                <MessageSquareText className="fill-current w-10 h-10" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link to="/test">
                <Bell className="fill-current w-10 h-10" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link to="/test">
                <User className="fill-current w-10 h-10" />
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
