import { X } from "lucide-react";
import { createPortal } from "react-dom";
import Login from "./Login";
import Register from "./Register";


type AuthMode = "login" | "register";

interface Props {
  mode: AuthMode;
  onClose: () => void;
  onChangeMode: (mode: AuthMode) => void;
}

export default function AuthModal({
  mode,
  onClose,
  onChangeMode,
}: Props) {
  return createPortal(
    <>
      <div
        className="
          fixed inset-0
          z-50
          bg-black/70
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-50

          w-[95vw]
          max-w-xl

          -translate-x-1/2
          -translate-y-1/2

          rounded-3xl
          border border-slate-800
          bg-[#040B1A]

          p-8

          shadow-2xl
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute
            right-6
            top-6

            text-slate-400
            transition
            hover:text-white
          "
        >
          <X size={24} />
        </button>

        {mode === "login" ? (
          <Login
            onSwitchToRegister={() =>
              onChangeMode("register")
            }
          />
        ) : (
          <Register
            onSwitchToLogin={() =>
              onChangeMode("login")
            }
          />
        )}
      </div>
    </>,
    document.body
  );
}