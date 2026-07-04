import { MapPinned, PlusCircle, LogOut } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import type { RootState } from "../store/store";
import { logoutUser } from "../store/userSlice";
import ConfirmModal from "../helpers/ConfirmModal";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: Props) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.userActions.isAuthenticated,
  );
  const places = useSelector((state: RootState) => state.placesAction.places);

  const sidebarTop = places && places.length > 0 ? "top-35" : "top-18";
  const sidebarHeight = places && places.length > 0 ? "h-[calc(100vh-140px)]" : "h-[calc(100vh-70px)]";

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userData");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div
      className={`fixed left-0 ${sidebarTop} md:top-30 z-50 flex ${sidebarHeight} w-64 flex-col border-r border-[#1D3A5F] bg-slate-950 transition-transform duration-300 ease-in-out md:h-[calc(100vh-100px)] ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:static lg:w-1/7 lg:translate-x-0`}
    >
      <nav className="flex flex-1 flex-col gap-2 p-4">
        <NavLink
          to="/places"
          onClick={() => setIsSidebarOpen(false)}
          className={navLinkClass}
        >
          <MapPinned size={20} />
          <span>My Places</span>
        </NavLink>

        <NavLink
          to="/add-place"
          onClick={() => setIsSidebarOpen(false)}
          className={navLinkClass}
        >
          <PlusCircle size={20} />
          <span>Add Place</span>
        </NavLink>
      </nav>

      {isAuthenticated && (
        <div className="border-t border-[#1D3A5F] p-4">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}

      {showLogoutModal && (
        <ConfirmModal
          title="Logout"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          variant="danger"
          onConfirm={handleLogout}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
