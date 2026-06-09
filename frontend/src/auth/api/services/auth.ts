import { api } from "../api";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export async function signup(data: SignupData) {
  const response = await api.post(
    "/users/signup",
    data
  );

  return response.data;
}

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const response = await api.post(
    "/users/login",
    data
  );

  return response.data;
}