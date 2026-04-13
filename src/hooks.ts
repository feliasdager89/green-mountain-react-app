import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuth() {
  const { currentUser, token } = useAppSelector((state) => state.accountReducer);

  return {
    user: currentUser,
    token,
    isAuthenticated: Boolean(token || currentUser),
  };
}
