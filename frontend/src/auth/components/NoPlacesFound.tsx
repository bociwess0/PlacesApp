import { MapPinned, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NoPlacesFound() {
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/30 px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-violet-500/20 bg-violet-600/10">
            <MapPinned size={56} className="text-violet-400" />
          </div>

          <h2 className="mt-8 text-3xl font-bold text-white md:text-5xl">
            You haven't added any places yet
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Start building your personal travel journal by adding the places
            you've visited or the destinations you plan to explore.
          </p>

          <button
            onClick={() => navigate("/add-place")}
            className="mt-10 cursor-pointer flex items-center gap-3 rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-500/30"
          >
            <PlusCircle size={20} />

            <span>Add Your First Place</span>
          </button>

        </div>
      </div>
    </div>
  );
}