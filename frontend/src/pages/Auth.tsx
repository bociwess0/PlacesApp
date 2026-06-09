import { Globe, MapPin, Pencil } from "lucide-react";
import { useState } from "react";
import AuthModal from "../auth/components/AuthModal";

export default function Auth() {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-full">
      <div className="flex min-h-full lg:px-8">
        <div className="flex-1">
          <h1 className="text-5xl font-bold leading-tight text-white">
            Discover.
            <br />
            Explore.
            <br />
            <span className="text-violet-500">Remember.</span>
          </h1>

          <p className="mt-8 max-w-xl text-2xl text-slate-400">
            YourPlaces helps you keep track of the places that matter to you.
          </p>

          <div className="mt-12 flex flex-col gap-4 max-w-md">
            <button
              className="
                rounded-2xl
                bg-violet-600
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-violet-500
                cursor-pointer
              "
              onClick={() => {
                setMode("login");
                setShowModal(true);
              }}
            >
              Login to Your Account
            </button>

            <button
              className="
                rounded-2xl
                border border-slate-700
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:border-violet-500
                cursor-pointer
              "
              onClick={() => {
                setMode("register");
                setShowModal(true);
              }}
            >
              Create an Account
            </button>
          </div>

          <div className="mt-16 flex flex-wrap gap-10">
            <div className="flex gap-3">
              <MapPin size={24} className="text-violet-500" />

              <div>
                <h3 className="font-semibold text-white">Save Places</h3>

                <p className="text-slate-400">Store all places you love.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Globe size={24} className="text-violet-500" />

              <div>
                <h3 className="font-semibold text-white">View on Map</h3>

                <p className="text-slate-400">See exactly where they are.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Pencil size={24} className="text-violet-500" />

              <div>
                <h3 className="font-semibold text-white">Easy to Manage</h3>

                <p className="text-slate-400">Organize your places.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <img src="/images/auth/globe.png" alt="Globe" />
        </div>
      </div>
      {showModal && (
        <AuthModal
          mode={mode}
          onClose={() => setShowModal(false)}
          onChangeMode={setMode}
        />
      )}
    </div>
  );
}
