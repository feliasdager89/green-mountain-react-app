import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import listingsReducer from "./Listings/reducer";

export const store = configureStore({
  reducer: {
    accountReducer,
    listingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
