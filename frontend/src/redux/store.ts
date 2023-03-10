import { Action, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import { ThunkAction } from "redux-thunk"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;