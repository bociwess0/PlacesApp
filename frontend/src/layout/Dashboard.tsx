import Sidebar from "../components/Siderbar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#111827]">
      <Header />

      <div className="flex">
        <Sidebar />
        <div className="flex-6/7 p-10">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
