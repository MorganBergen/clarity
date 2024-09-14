/*
 *  @description    backend server using express, will handle http requests and responses
 *                  api endpoints where you can define routes or endpoints to handle requests
 */

const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})