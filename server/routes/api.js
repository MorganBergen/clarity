const express = require('express');
const axios = require('axios');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your client's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

router.use(cors(corsOptions));
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// example route
router.get('/', (req, res) => {
  res.send('API is working');
});

router.get('/analyze-image', async (req, res) => {

  const { base64data } = req.body;
  const CLARIFAI_API_KEY = process.env.CLARIFAI_API_KEY;

  const raw = JSON.stringify({
    "inputs": [
      {
        "data": {
          "image": {
            "base64": base64data
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Key ${CLARIFAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: raw
  };

  try {
    const apiResponse = await axios.post("https://api.clarifai.com/v2/users/clarifai/apps/main/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs", requestOptions);
    res.json(apiResponse.data);
  } catch (error) {
    console.error("Error during API request:", error);
    res.status(500).json({ error: "Error during API request" });
  }
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

//  new route for clinical conditions api call
router.get('/conditions', async (req, res) => {

  const query = req.query.q;

  if (!query || query.length <= 2) {
    return res.status(400).json({ error: 'Query parameter must be longer than 2 characters' });
  }

  try {
    const response = await axios.get(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${query}&maxList=10`);
    const suggestions = response.data[3];
    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching condition data:', error);
    res.status(500).json({ error: 'Error fetching condition data' });
  }

})

module.exports = router;