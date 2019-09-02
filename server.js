const express = require('express')
const app = express();
const config = require('./config/serverConfig.json');

app.listen(config.serverPort, () => console.log(`Example app listening on port ${config.serverPort}!`))