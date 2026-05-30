import { Bell, ChevronDown, Search } from "lucide-react";
import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <div className="sticky top-0 left-0 bg-[#040B1A] flex justify-between items-center w-full">
      <div>
        <img src={logo} alt="YourPlaces Logo" />
      </div>
      <div className="flex items-center gap-8">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            className="
              h-14
              w-80
              rounded-2xl
              border border-slate-800
              bg-slate-950/50
              pl-12
              pr-4
              text-white
              outline-none
              transition-all

              placeholder:text-slate-500

              focus:border-violet-500/50
              focus:ring-2
              focus:ring-violet-500/20
            "
          />
        </div>

        <button
          className="
            text-slate-300
            transition
            hover:text-white
          "
        >
          <Bell size={26} />
        </button>

        <button
          className="
            flex items-center gap-3
            rounded-2xl
            transition
            hover:bg-slate-900
            px-2 py-1
          "
        >
          <img
            src="/images/profile_image_1.png"
            alt="Profile"
            className="h-14 w-14 rounded-full object-cover"
          />

          <ChevronDown size={18} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}
