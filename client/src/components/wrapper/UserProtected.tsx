import { useAppSelector } from "@/app/hooks";
import { selectRole } from "@/features/auth/authSlice";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const UserProtected = ({ children }: ProtectedRouteProps) => {
  const role = useAppSelector(selectRole);
  return role == "USER" ? children : <Navigate to="/" replace={true} />;
};

export default UserProtected;
