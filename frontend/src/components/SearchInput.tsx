import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/placesSlice";

export default function SearchInput() {

  const dispatch = useDispatch();

  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search places..."
        onChange={(e) => {
          dispatch(setSearchTerm(e.target.value));
        }}
        className="
          h-12
          w-full
          md:w-80

          rounded-2xl
          border
          border-[#1D3A5F]

          bg-slate-950/50

          pl-12
          pr-4

          text-white
          placeholder:text-slate-500

          focus:border-blue-500/50
          focus:ring-2
          focus:ring-blue-500/20
          outline-none
        "
      />
    </div>
  );
}
