const express = require('express');
const axios = require('axios');
const router = express.Router();

// example route
router.get('/', (req, res) => {
  res.send('API is working');
});

//  new route for fda api call
router.get('/medications', async (req, res) => {
  
  const query = req.query.q; //  get the query parameter from the request

  if (!query || query.length <= 2) {
    return res.status(400).json({ error: 'Query parameter must be longer than 2 characters' });
  }

  try {
    const response = await axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}*&limit=10`);
    const suggestions = response.data.results.map(results => results.openfda.brand_name[0]);
    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching medication data:', error);
    res.status(500).json({ error: 'Error fetching medication data' })
  }
});


module.exports = router;