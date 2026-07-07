import { Lock, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthRequired() {
  const navigate = useNavigate();

  return (
    <div className="flex md:min-h-[calc(100vh-160px)] px-0 md:px-5">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl md:border md:border-[#1D3A5F] md:bg-slate-950/40 p-4 md:p-12">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full md:bg-blue-600/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600/10">
              <Lock size={48} className="text-blue-400" />
            </div>
          </div>

          <h1 className="mt-8 text-center text-3xl font-bold text-white md:text-5xl">
            Authentication Required
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-center text-slate-400 md:text-lg">
            You need to sign in to view your places and manage your locations.
          </p>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:justify-center">
            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-semibold text-white 
              transition bg-blue-600"
            >
              <LogIn size={20} />
              Login
            </button>

            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl border border-[#294C73] px-8 py-4 font-semibold text-white transition hover:border-blue-500"
            >
              <UserPlus size={20} />
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
