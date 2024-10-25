/*
 *  @description    backend server using express, will handle http requests and responses
 *                  api endpoints where you can define routes or endpoints to handle requests
 */
const bodyParser = require('body-parser');

const app = require('./app');
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
