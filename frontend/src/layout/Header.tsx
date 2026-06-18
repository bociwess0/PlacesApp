import { Bell, ChevronDown, Menu } from "lucide-react";
import logo from "../assets/logo.svg";
import SearchInput from "../components/SearchInput";
import type { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ isSidebarOpen, setIsSidebarOpen }: Props) {

  const places = useSelector((state: RootState) => state.placesAction.places)
  
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#040B1A]">
      <div className="px-4 py-4 md:px-8">
        {/* Mobile Header */}
        <div className="relative flex items-center justify-between md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-slate-300 transition hover:text-white"
          >
            <Menu size={24} />
          </button>

          <NavLink to={"/"} className={'absolute left-1/2 h-14 -translate-x-1/2'}>
            <img
              src={logo}
              alt="YourPlaces Logo"
            />
          </NavLink>

          <button className="text-slate-300 transition hover:text-white">
            <Bell size={24} />
          </button>
        </div>

        <div className="hidden items-center justify-between md:flex">
          <NavLink to={"/"}>
            <img src={logo} alt="YourPlaces Logo" className="h-18" />
          </NavLink>

          <div className="flex items-center gap-8">
            {places && places.length > 0 && <SearchInput />}

            <button className="text-slate-300 transition hover:text-white">
              <Bell size={26} />
            </button>

            <button className="flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-slate-900">
              <img
                src="/images/profile_image_1.png"
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />

              <ChevronDown size={18} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <SearchInput />
        </div>
      </div>
    </header>
  );
}
