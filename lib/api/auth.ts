export async function logout(): Promise<void> {
  // Проксі-роут форвардить cookie на Express і чистить локальну сесію.
  const response = await fetch("/api/auth/logout", { method: "POST" });

  if (!response.ok) {
    throw new Error("Failed to log out");
  }
}
