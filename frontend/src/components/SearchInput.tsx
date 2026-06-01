import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search users..."
        className="
          h-12
          w-full
          md:w-80

          rounded-2xl
          border
          border-slate-800

          bg-slate-950/50

          pl-12
          pr-4

          text-white
          placeholder:text-slate-500

          focus:border-violet-500/50
          focus:ring-2
          focus:ring-violet-500/20
          outline-none
        "
      />
    </div>
  );
}
