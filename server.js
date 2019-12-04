'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOption));
const config = require('./config/serverConfig.json');
app.use(bodyParser.json());
require('./routes')(app);


app.listen(
  config.serverPort,
  () => console.log(`Example app listening on port ${config.serverPort}!`)
);
