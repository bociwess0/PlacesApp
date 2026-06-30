import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import placesReducer from "./placesSlice";
import snackbarReducer from "./snackbarSlice";

export const store = configureStore({
  reducer: {
    userActions: userReducer,
    placesAction: placesReducer,
    snackbarAction: snackbarReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;