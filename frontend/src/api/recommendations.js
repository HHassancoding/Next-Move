const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Missing VITE_API_BASE_URL');
}
export async function getRecommendations(
  {
   location, 
   latitude, 
   longitude, 
   type, 
   budget,
   excludedPlacesID
  }) {
  const payload = {
    location,
    type,
    budget,
    excludedPlacesID
  }

  if (latitude !== undefined) {
    payload.latitude = latitude
  }

  if (longitude !== undefined) {
    payload.longitude = longitude
  }

  const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
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

export async function geocodePostcode(postcode) {
  const normalizedPostcode = encodeURIComponent(postcode.trim())
  const response = await fetch(`https://api.postcodes.io/postcodes/${normalizedPostcode}`)

  if (!response.ok) {
    throw new Error('Failed to geocode postcode')
  }

  const body = await response.json()

  if (body.status !== 200 || !body.result) {
    throw new Error('Postcode not found')
  }

  return {
    latitude: body.result.latitude,
    longitude: body.result.longitude,
    area:
      body.result.admin_district ||
      body.result.admin_county ||
      body.result.parish ||
      body.result.region ||
      body.result.country,
  }
}
