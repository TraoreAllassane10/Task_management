import { useFlow } from "fractostate";
import { UserFlow } from "../flows/userFlow";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoutes = () => {
  const [userState, { actions: userActions }] = useFlow(UserFlow);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !userState.profile) {
      userActions.getProfil();
    }
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (userState.isLoading && !userState.profile) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2 size={36} className="animate-spin" />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
