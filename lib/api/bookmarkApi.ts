async function addArticleToSavedArticles(articleId: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/user/saved-articles/${articleId}`,
    { method: 'POST', credentials: 'include' },
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to add article to bookmarks');
  }
  return response.json();
}
async function removeArticleFromSavedArticles(articleId: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/user/saved-articles/${articleId}`,
    { method: 'DELETE', credentials: 'include' },
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || 'Failed to remove article from bookmarks',
    );
  }
  return response.json();
}
export { addArticleToSavedArticles, removeArticleFromSavedArticles };
