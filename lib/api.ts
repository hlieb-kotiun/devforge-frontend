import axios from "axios";

const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};
export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};
