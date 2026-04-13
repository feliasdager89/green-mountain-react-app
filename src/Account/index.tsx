import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as client from "./client";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import { clearCurrentUser, setCurrentUser } from "./reducer";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function Account(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { token, currentUser } = useAppSelector((state) => state.accountReducer);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token || currentUser) return;

      try {
        const user = await client.profile(token);
        dispatch(setCurrentUser({ user, token }));
      } catch (error) {
        console.error("Unable to load profile:", error);
        client.signout();
        dispatch(clearCurrentUser());
      }
    };

    void loadProfile();
  }, [token, currentUser, dispatch]);

  return (
    <div className="container mt-4">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={currentUser ? "profile" : "login"} replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/Account/login" replace />}
        />
      </Routes>
    </div>
  );
}
