/*
 *  @description    middleware can handle authentication, logging, error handling
 *                  data handling by using express.json(), the server can handle json data
 *                  define routes for data retrieval and data submission
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

module.exports = app;