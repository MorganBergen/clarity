/**
 * 
 */

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

//  initialize express router object, used to define routes for the api
//  the router is created from express's router class
//  it's like a mini application that can handle http requests, 
//  think of it as a traffic controller that directs incoming requests to the right handler functions
const router = express.Router();

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY,
})

const usdaApiKey = process.env.USDA_API_KEY;

const clarifaiApiKey = process.env.CLARIFAI_API_KEY;

const pb = new PocketBase('http://127.0.0.1:8090');

// example route
router.get('/', (req, res) => {
  res.send('API is working');
});

router.get('/test-python', async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:5002/hello');
    res.json(response.data);
  } catch (error) {
    console.error('Error calling python service:', error.message);
    res.status(500).json({
      error: 'Failed to call python service',
      details: error.message
    });
  }
});


/**
 *  @summary    
 *  @description 
 *  
 * router.post  defines a route that handles post http requests
 * '/api/aiy/analyze' is the path of the route
 * 
 * 
 */
router.post('/aiy', async (req, res) => {

  console.log('router.post /api/aiy');

  try {

    const { image } = req.body;

    console.log('Forwarding request to the python service on port 5002');
    
    //  forwarding the request to the python service
    const response = await axios.post('http://127.0.0.1:5002/analyze', {
      image: image
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    //  send the response from the python service back to the client
    res.json(response.data);

  } catch (error) {
    console.error('Error in aiy analysis:', error);
    res.status(500).json({
      error: 'Failed to perform aiy analysis',
      details: error.message
    });
  }
});

//  route for usda api call, currently just testing console logs
router.get('/usda', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${usdaApiKey}&dataType=Survey (FNDDS)`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Filter for basic foods matching the query
    const basicFoods = data.foods.filter(food => {
      return food.description.toLowerCase().includes(query.toLowerCase()) &&
        food.dataType === 'Survey (FNDDS)';
    });

    if (basicFoods.length === 0) {
      return res.status(404).json({ error: 'No matching foods found' });
    }

    // Return the array of matching foods
    return res.json(basicFoods);

  } catch (error) {
    console.error('Error fetching USDA data:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause.message);
    }
    return res.status(500).json({ error: 'Error fetching USDA data' });
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

router.post('/clarifai/analyze', async (req, res) => {
  
  try { 

    const { imageId, imageBase64 } = req.body;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "clarifai",
        "app_id": "main"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "base64": imageBase64
            }
          }
        }
      ]
    });

    const request_options = {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Authorization': `Key ${clarifaiApiKey}`, 'Content-Type': 'application/json' },
      body: raw
    };

    const response = await fetch(
      "https://api.clarifai.com/v2/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs",
      request_options
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Clarifai api error', result);
      throw new Error(`Clarifai api request failed: ${result.status?.description || 'Unknown error'}`);
    }

    if (!result.outputs?.[0]?.data?.concepts) {
      throw new Error('Invalid response format from clarifai api');
    }

    const standard = {
      clarifaiConfidence: JSON.stringify({
        model_info: {
          model_name: result.outputs[0].model.id,
          model_type: result.outputs[0].model.model_type_id,
          creator: result.outputs[0].model.creator,
          documentation_url: "https://old-docs.clarifai.com/guide/api-guide/api-overview"
        },
        predictions: result.outputs[0].data.concepts.map(concept => ({
          food_item: concept.name,
          confidence: concept.value
        }))
      })
    };

    await pb.collection('food').update(imageId, {
      clarifaiConfidence: standard.clarifaiConfidence
    });

    res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Error in clarifai analysis:', error);
    res.status(500).json({
      error: 'Failed to perform clarifai analysis',
      details: error.message
    });
  }

});

export default router;