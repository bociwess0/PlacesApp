import { Users, MapPinned, PlusCircle, LogOut, LogIn } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import type { RootState } from "../store/store";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: Props) {
  const userLoggedIn = useSelector(
    (state: RootState) => state.userActions.isAuthenticated,
  );

  return (
    <div
      className={`
        fixed
        top-30
        left-0
        z-50

        flex
        flex-col

        h-[calc(100vh-120px)]
        md:h-[calc(100vh-100px)]
        w-64

        border-r
        border-slate-800
        bg-slate-950

        transition-transform
        duration-300
        ease-in-out

        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

        lg:static
        lg:translate-x-0
        lg:w-1/7
      `}
    >
      <nav className="flex flex-1 flex-col gap-2 p-4">
        {userLoggedIn && (
          <NavLink
            onClick={() => setIsSidebarOpen(false)}
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
        )}

        <NavLink
          onClick={() => setIsSidebarOpen(false)}
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
          onClick={() => setIsSidebarOpen(false)}
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

      {userLoggedIn && (
        <div className="border-t border-slate-800 p-4">
          <button className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
