import type { ArticlesResponse } from "@/types/article";
import type { CurrentUser } from "@/types/user";
import { ApiError } from "./apiError";

/**
 * Усі запити йдуть відносними URL у власні Next-проксі (`app/api/*`).
 * Проксі форвардить httpOnly cookie на Express, тож `BACKEND_URL`
 * лишається серверним, а CORS не потрібен взагалі.
 */
async function requestJson<T>(url: string, fallbackMessage: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      typeof body?.message === "string" ? body.message : fallbackMessage;

    throw new ApiError(message, response.status);
  }

  return response.json();
}

export function getCurrentUser(): Promise<CurrentUser> {
  return requestJson<CurrentUser>(
    "/api/users/me",
    "Failed to load your profile",
  );
}

export function getMyArticles(
  ownerId: string,
  page: number,
  limit: number,
): Promise<ArticlesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return requestJson<ArticlesResponse>(
    `/api/articles/author/${ownerId}?${params}`,
    "Failed to load your articles",
  );
}

export function getSavedArticles(
  page: number,
  limit: number,
): Promise<ArticlesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return requestJson<ArticlesResponse>(
    `/api/saved-articles?${params}`,
    "Failed to load saved articles",
  );
}
