const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const database = require('./src/services/database/index');
const routes = require('./src/app/routes/index');

app.use(bodyParser.urlencoded(({ extended: true })));
app.use(bodyParser.json());
app.use(routes);

database.connect();

app.listen(process.env.PORT, ((err) => {
  if (err) console.log('Error to run the application');
}));

module.exports = app;
