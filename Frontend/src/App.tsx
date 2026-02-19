import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashbaordAdmin from "./pages/admin/DashbaordAdmin";
import TasksPage from "./pages/admin/TasksPage";
import CreateTaskPage from "./pages/admin/CreateTaskPage";
import TeamPage from "./pages/admin/TeamPage";
import DashboardMember from "./pages/membre/DashboardMember";
import TasksMemberPage from "./pages/membre/TasksMemberPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";
import ProtectedMemberRoutes from "./components/ProtectedMemberRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoutes />}>
        <Route element={<ProtectedAdminRoutes />}>
          <Route path="/admin/dashboard" element={<DashbaordAdmin />} />
          <Route path="/admin/tasks" element={<TasksPage />} />
          <Route path="/admin/tasks/create" element={<CreateTaskPage />} />
          <Route path="/admin/team" element={<TeamPage />} />
        </Route>

        <Route element={<ProtectedMemberRoutes />}>
          <Route path="/member/dashboard" element={<DashboardMember />} />
          <Route path="/member/tasks" element={<TasksMemberPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
