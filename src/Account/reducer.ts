import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./client";

type AccountState = {
  currentUser: User | null;
  token: string | null;
};

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState: AccountState = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;