const express = require('express');
const router = express.Router();

// example route
router.get('/', (req, res) => {
  res.send('API is working');
});

//  route to fetch medication data
router.get('/medications', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}*&limit=10`);
    res.json(response.data.results.map(result => result.openfda.brand_name[0]));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medication data'});
  }
});

module.exports = router;