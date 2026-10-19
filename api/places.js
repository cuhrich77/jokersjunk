export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { input } = req.query;
  if (!input || input.length < 2) {
    return res.status(400).json({ predictions: [] });
  }

  const apiKey = process.env.GOOGLE_MAPS_KEY;
  if (!apiKey) {
    return res.status(500).json({ predictions: [], error: 'GOOGLE_MAPS_KEY is not set in Vercel' });
  }

  try {
    const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': apiKey },
      body: JSON.stringify({
        input: input,
        includedRegionCodes: ['us'],
        locationBias: { circle: { center: { latitude: 30.05, longitude: -81.55 }, radius: 50000 } },
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ predictions: [], error: data.error.message, status: data.error.status });
    }

    const predictions = (data.suggestions || []).map(s => ({
      description: s.placePrediction?.text?.text || '',
      place_id: s.placePrediction?.placeId || '',
    }));

    return res.status(200).json({ predictions });
  } catch (err) {
    console.error('Places API error:', err);
    return res.status(500).json({ predictions: [], error: 'Failed' });
  }
}
