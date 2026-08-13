export async function getPopularArticles(limit: number = 4) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles?page=1&limit=${limit}`
  );

  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}       
