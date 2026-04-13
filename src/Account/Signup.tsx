import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "./client";
import { setCurrentUser } from "./reducer";
import { useAppDispatch } from "../hooks";
import axios from "axios";

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"provider" | "guardian">("provider");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setSubmitting(true);

      const data = await signup({
        first_name,
        last_name,
        email,
        password,
        role,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(setCurrentUser({ user: data.user, token: data.token }));

      navigate("/listings");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) && err.response?.data?.error ? err.response.data.error : "Signup failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-sm mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

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

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value as "provider" | "guardian")}
          >
            <option value="provider">Provider</option>
            <option value="guardian">Guardian</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Sign in
        </Link>
      </p>
    </div>
  );
}
