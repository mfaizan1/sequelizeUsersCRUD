'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./models');
require('./associations/associations')();
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

db.sequelize.sync({force: false})
  . then(() => {
    console.log('table generated');
  })
  . catch((err) => console.log(err));

app.listen(
  config.serverPort,
  () => console.log(`Example app listening on port ${config.serverPort}!`)
);
