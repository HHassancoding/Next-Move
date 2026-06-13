export async function getRecommendations({ location, type, budget }) {
  const response = await fetch('/api/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location,
      type,
      budget,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
