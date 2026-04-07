import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./Listings/reducer";

export const store = configureStore({
  reducer: {
    listingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;