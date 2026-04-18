const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Condition ID is required' });
  }

  const POLYMARKET_API_URL = `https://data-api.polymarket.com/markets?condition_id=${id}`;
  try {
    const apiResponse = await fetch(POLYMARKET_API_URL);
    if (!apiResponse.ok) {
      throw new Error(`Polymarket API returned status: ${apiResponse.status}`);
    }
    const data = await apiResponse.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
