const express = require('express')
const app = express();
const config = require('./config/serverConfig.json');
const routes = require('./routes')(app);
app.listen(config.serverPort, () => console.log(`Example app listening on port ${config.serverPort}!`))