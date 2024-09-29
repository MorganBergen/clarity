/*
 *  @description    backend server using express, will handle http requests and responses
 *                  api endpoints where you can define routes or endpoints to handle requests
 */

/**
 * initial connection ip address 216.147.125.175/32 
 * local connection 104.28.50.43/32
 * username clarityfounders
 * password nv2lYt5MLU1QYziI
 * connection string mongodb+srv://clarityfounders:<db_password>@clarity.9saaa.mongodb.net/?retryWrites=true&w=majority&appName=Clarity
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  

app.use(bodyParser.json());
