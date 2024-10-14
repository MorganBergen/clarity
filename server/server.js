/*
 *  @description    backend server using express, will handle http requests and responses
 *                  api endpoints where you can define routes or endpoints to handle requests
 */


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  

app.use(bodyParser.json());
