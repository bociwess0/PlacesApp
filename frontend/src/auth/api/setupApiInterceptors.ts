import type { AxiosError } from "axios";
import { api } from "./api";
import { showSnackbar } from "../../store/snackbarSlice";
import { store } from "../../store/store";

let interceptorInitialized = false;

export function setupApiInterceptors() {
  if (interceptorInitialized) return;

  interceptorInitialized = true;

  api.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("userData");

        store.dispatch(
          showSnackbar({
            message: "Your session has expired. Please log in again.",
            type: "error",
          }),
        );
      }

      return Promise.reject(error);
    },
  );
}