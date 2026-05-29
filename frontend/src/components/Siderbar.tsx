import {
  Users,
  MapPinned,
  PlusCircle,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">
      

      <nav className="flex flex-1 flex-col gap-2 p-4">
        <a
          href="#"
          className="flex items-center gap-3 rounded-xl bg-violet-600 px-4 py-3 text-white transition hover:bg-violet-500"
        >
          <Users size={20} />
          <span>All Users</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <MapPinned size={20} />
          <span>My Places</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <PlusCircle size={20} />
          <span>Add Place</span>
        </a>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}