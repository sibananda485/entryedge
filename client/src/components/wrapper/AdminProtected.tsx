import { useAppSelector } from "@/app/hooks";
import { selectRole } from "@/features/auth/authSlice";
import NotFound from "@/pages/NotFound";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const AdminProtected = ({ children }: ProtectedRouteProps) => {
  const role = useAppSelector(selectRole);
  return role == "ADMIN" ? children : <NotFound />;
};

export default AdminProtected;
