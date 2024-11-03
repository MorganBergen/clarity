/*
 *  @description    middleware can handle authentication, logging, error handling
 *                  data handling by using express.json(), the server can handle json data
 *                  define routes for data retrieval and data submission
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

const app = express();

dotenv.config();

//  middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

//  routes
app.use('/api', apiRoutes);

export default app;