import {
  ChevronDown,
  LogOut,
  MapPin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
  token: string;
  userId: string;
}

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const user: UserData | null = JSON.parse(
    localStorage.getItem("userData") ?? "null",
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");

    setIsOpen(false);
    navigate("/auth");
  };

  if (!user) {
    return null;
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-slate-900"
      >
        <img
          src="/images/profile_image_1.png"
          alt={user.name}
          className="h-9 w-9 md:h-12 md:w-12 rounded-full object-cover"
        />

        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-100 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-800 bg-[#07101f] shadow-2xl shadow-black/40 sm:w-80">
          <div className="flex items-center gap-4 border-b border-slate-800 p-5">
            <img
              src="/images/profile_image_1.png"
              alt={user.name}
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate font-semibold text-white">
                {user.name}
              </p>

              <p className="mt-1 truncate text-sm text-slate-400">
                {user.email}
              </p>
            </div>
          </div>

          <div className="p-2">
            <button
              type="button"
              onClick={() => handleNavigate("/places")}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800/70 hover:text-white"
            >
              <MapPin size={20} className="text-slate-400" />
              <span className="font-medium">My Places</span>
            </button>
          </div>

          <div className="border-t border-slate-800 p-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}