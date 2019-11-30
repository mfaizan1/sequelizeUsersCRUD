'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
const config = require('./config/serverConfig.json');
app.use(bodyParser.json());
require('./routes')(app);


app.listen(
  config.serverPort,
  () => console.log(`Example app listening on port ${config.serverPort}!`)
);
