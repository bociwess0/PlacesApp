import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { signup } from "../api/services/auth";
import axios from "axios";
import Message from "../ui/Message";
import RegisterBtn from "../ui/RegisterBtn";

interface Props {
  onSwitchToLogin: () => void;
}

interface ErrorResponse {
  message: string;
}

export default function Register({ onSwitchToLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await signup({
        name,
        email,
        password,
      });

      console.log(response);

      setMessage("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        setError(err.response?.data.message ?? "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">Create Account</h2>

        <p className="mt-3 text-slate-400">
          Join YourPlaces and start exploring
        </p>
      </div>

      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Full Name</label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
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
          <label className="mb-2 block text-sm text-slate-300">Email</label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
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
          <label className="mb-2 block text-sm text-slate-300">Password</label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="password"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
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

        <Message message={message} error={error} />
        <RegisterBtn isLoading={isLoading} />
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
