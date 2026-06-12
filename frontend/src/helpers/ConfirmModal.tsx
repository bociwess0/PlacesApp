import { AlertTriangle, X } from "lucide-react";
import { createPortal } from "react-dom";

interface Props {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  onConfirm,
  onClose,
}: Props) {
  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-800 bg-[#040B1A] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 transition hover:text-white"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
              variant === "danger"
                ? "bg-red-500/10"
                : "bg-violet-500/10"
            }`}
          >
            <AlertTriangle
              size={40}
              className={
                variant === "danger"
                  ? "text-red-400"
                  : "text-violet-400"
              }
            />
          </div>

          <h2 className="text-3xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-4 text-slate-400">
            {message}
          </p>

          <div className="mt-8 flex w-full gap-4">
            <button
              onClick={onClose}
              className="cursor-pointer flex-1 rounded-xl border border-slate-700 px-4 py-3 font-medium text-white transition hover:border-slate-600"
            >
              {cancelText}
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`cursor-pointer flex-1 rounded-xl px-4 py-3 font-medium text-white transition ${
                variant === "danger"
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-violet-600 hover:bg-violet-500"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}