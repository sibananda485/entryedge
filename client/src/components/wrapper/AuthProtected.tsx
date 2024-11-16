import { useAppSelector } from "@/app/hooks";
import { selectIsLoggedIn } from "@/features/auth/authSlice";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const AuthProtected = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to="/" replace={true} />;
};

export default AuthProtected;
