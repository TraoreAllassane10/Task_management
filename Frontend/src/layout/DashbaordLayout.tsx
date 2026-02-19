import { useState, type ReactNode } from "react";
import Sidebar from "../components/Sidebar";

const DashbaordLayout = ({ children }: { children: ReactNode }) => {
  const [isMinified, setIsMinified] = useState(false);
  return (
    <div>
      <Sidebar isMinified={isMinified} setIsMinified={setIsMinified} />
      <main
        className={`${isMinified ? "ml-20 " : "lg:ml-64"} p-4 transition duration-200`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashbaordLayout;
