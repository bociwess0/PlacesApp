import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { login } from "../api/services/auth";
import axios from "axios";
import Message from "../ui/Message";
import LoginBtn from "../ui/LoginBtn";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../store/notificationSlice";

interface Props {
  onSwitchToRegister: () => void;
}

interface ErrorResponse {
  message: string;
}

export default function Login({ onSwitchToRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await login({
        email,
        password,
      });
      setMessage("User has been logged in successfully!");

      const tokenExpirationDate =
        response.expirationDate ||
        new Date(new Date().getDate() + 1000 * 60 * 60);

      const userLoggedIn = JSON.stringify({
        userId: response.user,
        token: response.token,
        email: response.email,
        name: response.name,
        expiration: tokenExpirationDate.toISOString(),
      })

      localStorage.setItem(
        "userData",
        userLoggedIn
      );

      dispatch(loginUser({ userId: response.user, email: response.email, name: response.name, token: response.token }))

      navigate("/places")

      dispatch(
        addNotification({
          title: "Welcome back",
          message: "We are happy to see you again!",
          type: "welcome",
        }),
      );

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
        <h2 className="text-4xl font-bold text-white">Welcome Back</h2>

        <p className="mt-3 text-slate-400">Login to your account to continue</p>
      </div>

      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
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
                border border-[#1D3A5F]
                bg-slate-950/50
                py-4 pl-12 pr-4
                text-white
                outline-none
                transition
                focus:border-blue-500
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
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                rounded-xl
                border border-[#1D3A5F]
                bg-slate-950/50
                py-4 pl-12 pr-4
                text-white
                outline-none
                transition
                focus:border-blue-500
              "
            />
          </div>
        </div>
        <LoginBtn isLoading={isLoading} />
      </form>

      <Message message={message} error={error} />

      <p className="mt-8 text-center text-slate-400">
        Don't have an account?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-blue-400 hover:text-blue-300"
        >
          Create one
        </button>
      </p>
    </>
  );
}
