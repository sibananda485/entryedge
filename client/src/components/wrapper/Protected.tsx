import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedRouteProps) => {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Protected;
