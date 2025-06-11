import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import { CircularProgress } from "@mui/material";
import { UserType } from "./models/user/User";

function AuthRoutes() {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="center">
        <CircularProgress variant="indeterminate" size={80} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (
    user?.userType === UserType.PARTICIPANT &&
    !user.participant &&
    location.pathname !== "/sign-up/participant"
  ) {
    return <Navigate to="/sign-up/participant" replace />;
  }

  if (
    user?.userType === UserType.PARTICIPANT &&
    user.participant &&
    location.pathname === "/sign-up/participant"
  ) {
    return <Navigate to="/events" replace />;
  }

  if (
    user?.userType === UserType.ORGINIZER &&
    !user.organizer &&
    location.pathname !== "/sign-up/orginizer"
  ) {
    return <Navigate to="/sign-up/orginizer" replace />;
  }
  if (
    user?.userType === UserType.ORGINIZER &&
    user.organizer &&
    location.pathname === "/sign-up/orginizer"
  ) {
    return <Navigate to="/events" replace />;
  }

  return <Outlet />;
}

export default AuthRoutes;
