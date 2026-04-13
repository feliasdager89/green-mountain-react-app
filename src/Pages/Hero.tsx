import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/fall_scenery.jpg";
import { login, signup } from "../Account/client";
import { setCurrentUser } from "../Account/reducer";
import { useAppDispatch } from "../hooks";

type AuthMode = "login" | "signup";

export default function Hero() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<"provider" | "guardian">("provider");
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
      const message =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : "Login failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setSubmitting(true);
      const data = await signup({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(setCurrentUser({ user: data.user, token: data.token }));
      navigate("/listings");
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : "Signup failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
  };

  return (
    <section
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-emerald-200">
            GreenMountain Care
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            Find trusted homecare support without the search feeling overwhelming.
          </h1>
          <p className="max-w-xl text-lg text-gray-200 md:text-xl">
            Connect with dependable providers, manage your account, and get to the
            right care options from one place.
          </p>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
          <div className="mb-6 grid grid-cols-2 rounded-2xl bg-black/20 p-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-xl px-4 py-3 transition ${
                mode === "login" ? "bg-white text-slate-900" : "text-white/80"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`rounded-xl px-4 py-3 transition ${
                mode === "signup" ? "bg-white text-slate-900" : "text-white/80"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-5">
            <h2 className="text-2xl font-semibold">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-gray-200">
              {mode === "login"
                ? "Sign in to continue browsing providers and listings."
                : "Join as a provider or guardian and get started right away."}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-2xl border border-red-300/40 bg-red-500/20 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          )}

          <form
            onSubmit={mode === "login" ? handleLogin : handleSignup}
            className="space-y-4"
          >
            {mode === "signup" && (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm text-gray-200">First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm text-gray-200">Last Name</span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                  />
                </label>
              </div>
            )}

            <label className="block">
              <span className="mb-1 block text-sm text-gray-200">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm text-gray-200">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
              />
            </label>

            {mode === "signup" && (
              <label className="block">
                <span className="mb-1 block text-sm text-gray-200">I am joining as</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "provider" | "guardian")}
                  className="w-full rounded-xl border border-white/15 bg-white/90 px-4 py-3 text-slate-900 outline-none ring-0"
                >
                  <option value="provider">Provider</option>
                  <option value="guardian">Guardian</option>
                </select>
              </label>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                  ? "Login"
                  : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

