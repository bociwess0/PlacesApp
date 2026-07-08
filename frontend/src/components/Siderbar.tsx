import { MapPinned, PlusCircle } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: Props) {
  


  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div
      className={`absolute left-0 top-0 z-40 flex h-[calc(100dvh-100%)] min-h-[calc(100dvh-80px)] w-64 flex-col border-r border-[#1D3A5F] bg-slate-950 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:h-auto lg:min-h-[calc(100vh-100px)] lg:w-1/7 lg:shrink-0 lg:translate-x-0 lg:shadow-none ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
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

    </div>
  );
}