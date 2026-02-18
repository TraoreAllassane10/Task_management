import { useFlow } from "fractostate";
import { UserFlow } from "../flows/userFlow";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedAdminRoutes = () => {
  const [userState] = useFlow(UserFlow);


  if (userState.profile && userState.profile.role !== "Admin") {
    return <Navigate to="/member/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoutes;
