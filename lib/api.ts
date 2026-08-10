export async function getPopularArticles(limit: number = 4) {
  const res = await fetch(
    `http://localhost:5000/articles?page=1&limit=${limit}`
  );
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

