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
import type { Article } from "@/types/article";

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}

export type ArticlesFilter = "all" | "popular";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getArticles(
  page: number = 1,
  limit: number = 6,
  filter: ArticlesFilter = "all",
): Promise<ArticlesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filter === "popular") {
    params.set("filter", "popular");
  }

  const response = await fetch(`${API_URL}/articles?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}


export function getPopularArticles(
  limit: number = 4,
): Promise<ArticlesResponse> {
  return getArticles(1, limit);
}
