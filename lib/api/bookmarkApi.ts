// Відносний URL у власний проксі: BACKEND_URL серверна і в браузері undefined.
const SAVED_ARTICLES_URL = "/api/saved-articles";

async function addArticleToSavedArticles(articleId: string) {
  const response = await fetch(`${SAVED_ARTICLES_URL}/${articleId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to add article to bookmarks');
  }
  return response.json();
}
async function removeArticleFromSavedArticles(articleId: string) {
  const response = await fetch(`${SAVED_ARTICLES_URL}/${articleId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || 'Failed to remove article from bookmarks',
    );
  }
  return response.json();
}
export { addArticleToSavedArticles, removeArticleFromSavedArticles };
