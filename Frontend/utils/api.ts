export async function getPDFContent() {
  const response = await fetch("/api/content")
  if (!response.ok) {
    throw new Error("Failed to fetch content")
  }
  return response.json()
}

