import { Bell, Menu } from "lucide-react";
import logo from "../assets/logo.svg";
import SearchInput from "../components/SearchInput";
import type { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import ProfileDropdown from "../components/ProfileDropdown";
import NotificationsDropdown from "../components/NotificationsDropdown";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ isSidebarOpen, setIsSidebarOpen }: Props) {
  const places = useSelector((state: RootState) => state.placesAction.places);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#040B1A]">
      <div className="px-6 py-4 md:py-4 md:px-8">
        {/* Mobile Header */}
        <div className="flex w-full items-center justify-between gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="shrink-0 cursor-pointer rounded-lg p-1 text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            <Menu size={24} />
          </button>

          <NavLink
            to="/"
            className="min-w-0 flex-1"
          >
            <img
              src={logo}
              alt="YourPlaces Logo"
              className="h-auto w-40 max-w-full object-contain"
            />
          </NavLink>

          <div className="flex shrink-0 items-center gap-1">
            <NotificationsDropdown />

            <ProfileDropdown />
          </div>
        </div>

        <div className="hidden items-center justify-between md:flex">
          <NavLink to={"/"}>
            <img src={logo} alt="YourPlaces Logo" className="h-18" />
          </NavLink>

          <div className="flex items-center gap-8">
            {places && places.length > 0 && <SearchInput />}

            <NotificationsDropdown />

            <ProfileDropdown />
          </div>
        </div>

        {/* Mobile Search */}

        {places && places.length > 0 && (
          <div className="mt-2 md:hidden">
            <SearchInput />
          </div>
        )}
      </div>
    </header>
  );
}
