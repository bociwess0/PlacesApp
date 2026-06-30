import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SnackbarType = "success" | "error" | "warning" | "info";

interface SnackbarState {
  open: boolean;
  message: string;
  type: SnackbarType;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  type: "success",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        type?: SnackbarType;
      }>,
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type ?? "success";
    },

    hideSnackbar: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});


const snackbarReducer = snackbarSlice.reducer;

export const showSnackbar = snackbarSlice.actions.showSnackbar;
export const hideSnackbar = snackbarSlice.actions.hideSnackbar;

export default snackbarReducer;
