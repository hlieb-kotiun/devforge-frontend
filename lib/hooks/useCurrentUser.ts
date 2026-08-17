"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/profile";
import { isUnauthorizedError } from "@/lib/api/apiError";

export const CURRENT_USER_QUERY_KEY = ["currentUser"] as const;

/**
 * Єдине джерело поточного користувача. Спільний ключ означає, що Header
 * і сторінка профілю ділять один кеш-запис замість двох окремих запитів.
 */
export const useCurrentUser = () =>
  useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: getCurrentUser,
    staleTime: 60_000,
    // 401 — це нормальна відповідь для гостя, ретраїти її немає сенсу.
    retry: (failureCount, error) =>
      !isUnauthorizedError(error) && failureCount < 2,
  });
