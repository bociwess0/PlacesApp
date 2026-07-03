import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import placesReducer from "./placesSlice";
import snackbarReducer from "./snackbarSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    userActions: userReducer,
    placesAction: placesReducer,
    snackbarAction: snackbarReducer,
    notificationAction: notificationReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;