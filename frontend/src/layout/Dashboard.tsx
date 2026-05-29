import Sidebar from "../components/Siderbar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
       <div className="h-screen overflow-hidden bg-[#111827]">
      <Header />

      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar />

        <div className="flex-6/7 p-10 overflow-y-auto">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
