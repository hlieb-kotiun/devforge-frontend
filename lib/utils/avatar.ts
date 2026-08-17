export const AVATAR_PLACEHOLDER = "/images/avatar-placeholder.svg";

/**
 * Перша непорожня аватарка зі списку кандидатів, інакше нейтральний
 * плейсхолдер. Бек тримає аватарку то в `avatar`, то в `avatarUrl`,
 * і обидва поля мають `default: ""`.
 */
export const getAvatarUrl = (
  ...candidates: (string | null | undefined)[]
): string =>
  candidates.find((value) => value?.trim())?.trim() ?? AVATAR_PLACEHOLDER;
