export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { input } = req.query;

  if (!input || input.length < 3) {
    return res.status(400).json({ predictions: [] });
  }
  const apiKey = process.env.GOOGLE_MAPS_KEY;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&components=country:us&key=${apiKey}&language=en`
    );
    const data = await response.json();

    if (data.status === 'REQUEST_DENIED') {
      console.error('Google API error:', data.error_message);
      return res.status(200).json({ predictions: [] });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Places API error:', err);
    return res.status(500).json({ predictions: [], error: 'Failed' });
  }
}
