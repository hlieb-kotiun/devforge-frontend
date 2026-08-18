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

const SAVED_IDS_PAGE_LIMIT = 50;
const SAVED_IDS_MAX_PAGES = 20;

export async function getAllSavedArticleIds(): Promise<string[]> {
  const firstPage = await getSavedArticles(1, SAVED_IDS_PAGE_LIMIT);
  const ids = firstPage.articles.map((article) => article._id);
  const totalPages = Math.min(
    Math.ceil((firstPage.total || ids.length) / SAVED_IDS_PAGE_LIMIT) || 1,
    SAVED_IDS_MAX_PAGES,
  );

  for (let page = 2; page <= totalPages; page += 1) {
    const response = await getSavedArticles(page, SAVED_IDS_PAGE_LIMIT);
    ids.push(...response.articles.map((article) => article._id));
  }

  return [...new Set(ids)];
}
