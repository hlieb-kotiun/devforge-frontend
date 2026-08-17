import type { Article } from "@/types/article";

/**
 * Ім'я автора статті. У беку `name` заповнене не в усіх юзерів (реєстрація
 * пише лише `username`), а `ownerId` приходить populate-нутим не звідусіль,
 * тому потрібен ланцюжок фолбеків.
 */
export const getAuthorName = (
  article: Article,
  fallback = "Unknown author",
): string => {
  const { ownerId, author } = article;

  if (typeof ownerId === "object" && ownerId !== null) {
    return ownerId.name || ownerId.username || author || fallback;
  }

  return author || fallback;
};
