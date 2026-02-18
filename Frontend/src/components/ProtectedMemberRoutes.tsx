import { useFlow } from "fractostate";
import { UserFlow } from "../flows/userFlow";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedMemberRoutes = () => {
  const [userState] = useFlow(UserFlow);

  if (userState.profile && userState.profile.role !== "Membre") {
    return <Navigate to="/admin/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedMemberRoutes;
