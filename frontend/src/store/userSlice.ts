import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userId: null,
  name: null,
  email: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userId: string;
        name: string;
        email: string;
        token: string;
      }>,
    ) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
     logout: (state) => {
      state.userId = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});


export const loginUser = userSlice.actions.login;
export const logoutUser = userSlice.actions.logout;

const userReducer = userSlice.reducer;


export default userReducer;