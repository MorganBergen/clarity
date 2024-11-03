import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import PocketBase from 'pocketbase';

import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({ 
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY,
})

const pb = new PocketBase('http://127.0.0.1:8090');


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
});

//  gpt analysis route
router.post('/gpt/analyze-gpt', async (req, res) => {
  
  try {
    const { imageId, imageBase64, clarifaiConfidence } = req.body;

    //  expected structure of the response that i will tell it to return 
    //  {   "food_items": [ { "name": "grapefruit", "portion_size": "1 medium", "calories": 42, "protein_g": 1, "fat_g": 0.1, "carbohydrates_g": 10.7 }, } ]
    const structure = `{"food_items": [ { "name": "grapefruit", "portion_size": "1 medium", "calories": 42, "protein_g": 1, "fat_g": 0.1, "carbohydrates_g": 10.7 }, }]}`;

    const not_allowed = "do not include anything else, do not include ```json or ``` and do not include any other text";

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "identify food objects in the image and consider the confidence scores provided for any guidance, approximate portion size of food object, determine calories, protein, fat, and carbohydrates" },
            { type: "text", text: `provide your response in json in a format like this ${structure}, and ${not_allowed}` },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
            { type: "text", text: `these are the results from a image classification model, it returns confidence scores for each concept/object in the image, ${JSON.stringify(clarifaiConfidence)}` },
          ]
        },
      ]
    });

    const gpt_mini = response.choices[0].message.content;

    await pb.collection('food').update(imageId, {
      gpt_mini: gpt_mini
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error in GPT analysis:', error);
    res.status(500).json({ 
      error: 'Failed to perform GPT analysis',
      details: error.message 
    });
  }
});


export default router;