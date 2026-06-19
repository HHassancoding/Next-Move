export async function getRecommendations({ location, latitude, longitude, type, budget }) {
  const payload = {
    location,
    type,
    budget,
  }

  if (latitude !== undefined) {
    payload.latitude = latitude
  }

  if (longitude !== undefined) {
    payload.longitude = longitude
  }

  const response = await fetch('/api/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
