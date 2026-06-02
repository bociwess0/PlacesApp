import { Mail, Lock, User } from "lucide-react";

interface Props {
  onSwitchToLogin: () => void;
}

export default function Register({
  onSwitchToLogin,
}: Props) {
  return (
    <>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">
          Create Account
        </h2>

        <p className="mt-3 text-slate-400">
          Join YourPlaces and start exploring
        </p>
      </div>

      <form className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Enter your full name"
              className="
                w-full
                rounded-xl
                border border-slate-800
                bg-slate-950/50
                py-4 pl-12 pr-4
                text-white
                outline-none
                transition
                focus:border-violet-500
              "
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                rounded-xl
                border border-slate-800
                bg-slate-950/50
                py-4 pl-12 pr-4
                text-white
                outline-none
                transition
                focus:border-violet-500
              "
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="password"
              placeholder="Create a password"
              className="
                w-full
                rounded-xl
                border border-slate-800
                bg-slate-950/50
                py-4 pl-12 pr-4
                text-white
                outline-none
                transition
                focus:border-violet-500
              "
            />
          </div>
        </div>

        <button
          type="submit"
          className="
            w-full
            rounded-xl
            bg-violet-600
            py-4
            font-semibold
            text-white
            transition
            hover:bg-violet-500
          "
        >
          Create Account
        </button>
      </form>

      <p className="mt-8 text-center text-slate-400">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-violet-400 hover:text-violet-300"
        >
          Login
        </button>
      </p>
    </>
  );
}