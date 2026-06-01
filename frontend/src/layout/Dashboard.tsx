import { useState } from "react";
import Sidebar from "../components/Siderbar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#111827]">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {isSidebarOpen && (
        <div
          className="
            fixed
            inset-0
            top-20
            z-40
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex h-[calc(100vh-120px)] md:h-[calc(100vh-80px)]">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex-6/7 p-5 overflow-y-auto">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
