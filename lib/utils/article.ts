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

/**
 * Деякі статті мають `img` як відносний шлях від бека (напр. `uploads/xyz`
 * або, з віндового аплоаду, `uploads\xyz`), а не повний URL. Простий конкат
 * `${API_URL}${img}` ламається без роздільника і на бекслешах — звідси
 * `Failed to construct 'URL': Invalid URL` у next/image.
 */
export const getArticleImageSrc = (image?: string | null): string | null => {
  if (!image) return null;

  if (image.startsWith("http")) return image;

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";
  const imagePath = image.replace(/\\/g, "/").replace(/^\/+/, "");

  return `${backendUrl}/${imagePath}`;
};
