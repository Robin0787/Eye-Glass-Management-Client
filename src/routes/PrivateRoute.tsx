import { ReactNode } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isLoggedIn) {
    toast.error("Login Please...!");
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
