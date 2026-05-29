import { Users, MapPinned, PlusCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex h-[calc(100vh-120px)] flex-1/7 flex-col border-r border-slate-800 bg-slate-950">
      <nav className="flex flex-1 flex-col gap-2 p-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition
      ${
        isActive
          ? "bg-violet-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`
          }
        >
          <Users size={20} />
          <span>All Users</span>
        </NavLink>

        <NavLink
          to="/places"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition
      ${
        isActive
          ? "bg-violet-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`
          }
        >
          <MapPinned size={20} />
          <span>My Places</span>
        </NavLink>

        <NavLink
          to="/add-place"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition
      ${
        isActive
          ? "bg-violet-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`
          }
        >
          <PlusCircle size={20} />
          <span>Add Place</span>
        </NavLink>
      </nav>
       <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
