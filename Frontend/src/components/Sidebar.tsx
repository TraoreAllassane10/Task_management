import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  PlusCircle,
  Users,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useFlow } from "fractostate";
import { UserFlow } from "../flows/userFlow";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({isMinified, setIsMinified} : any) {
  const [isOpen, setIsOpen] = useState(false);
//   const [isMinified, setIsMinified] = useState(false);

  const navigate = useNavigate();

  const [userState, { actions: userActions }] = useFlow(UserFlow);

  const adminMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, url: "/admin/dashboard" },
    { label: "Taches", icon: CheckSquare, url: "/admin/tasks" },
    { label: "Creer une tache", icon: PlusCircle, url: "/admin/tasks/create" },
    { label: "Equipe", icon: Users, url: "/admin/team" },
  ];

  const memberMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, url: "/member/dashboard" },
    { label: "Mes Taches", icon: CheckSquare, url: "/member/tasks" },
  ];

  const menuItems =
    userState.profile?.role === "Admin" ? adminMenuItems : memberMenuItems;


  const handleLogout = () => {
    userActions.logout();
    navigate("/");
  }

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg border border-gray-50 bg-white shadow"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 bg-white border-r border-gray-50 shadow-sm
          transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isMinified ? "w-20" : "w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isMinified && (
              <h1 className="text-lg font-bold text-slate-700">TaskManager</h1>
            )}

            {/* Desktop Minify */}
            <button
              onClick={() => setIsMinified(!isMinified)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100"
            >
              {isMinified ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>

            {/* Mobile Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-3 space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <SidebarItem
                  key={index}
                  icon={Icon}
                  label={item.label}
                  url={item.url}
                  isMinified={isMinified}
                />
              );
            })}
          </nav>

          {/* Logout*/}
          <div className="p-3 border-t border-gray-200">
            <button onClick={handleLogout}
              className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                    text-red-500 hover:bg-red-50
                `}
            >
              <LogOut size={18} />
              {!isMinified && <span>Deconnexion</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon: Icon, label, url, isMinified, danger }: any) {
  return (
    <Link
      to={url}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
        ${danger ? "text-red-500 hover:bg-red-50" : "hover:bg-gray-100"}
      `}
    >
      <Icon size={18} />
      {!isMinified && <span>{label}</span>}
    </Link>
  );
}
