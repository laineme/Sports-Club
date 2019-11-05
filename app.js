/*
 * Sports club - Running is fun
 * Marjaana Laine
 *
 * Backend
 */

const express = require('express');
const app = express(); // Init app
const hostname = '0.0.0.0';
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const helmet = require('helmet');
const path = require('path');
const { addInitUsers } = require('./models/userModel');

const api = require('./api');

app.use(helmet()); // helmet for protection
app.use(bodyParser.urlencoded({ // BodyParser middleware
  extended: false
}));
app.use(bodyParser.json());
app.use(expressSanitizer());

/** 'build' contains the single page application made with React and Redux 
 * adds the react production build to serve react requests */
app.use(express.static(path.join(__dirname, 'front-end/build')));

addInitUsers();

app.use('/', api);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});