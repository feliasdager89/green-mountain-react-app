
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AxiosError } from "axios";
import { login } from "./client";
import { setCurrentUser } from "./reducer";
import { useAppDispatch } from "../hooks";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setSubmitting(true);

      const data = await login({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(setCurrentUser({ user: data.user, token: data.token }));

      navigate("/listings");
    } catch (err: unknown) {
      const message = (err as AxiosError<{ error: string }>)?.response?.data?.error || "Login failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-sm mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}