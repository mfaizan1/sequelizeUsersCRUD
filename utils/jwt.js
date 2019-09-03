const jwt = require("jsonwebtoken");
const config = require("../config/serverConfig.json");
module.exports = {
  issue(payload, expiresIn) {
    return jwt.sign(
        payload, 
        config.jwtSecret, {
      expiresIn:  "7d"
    });
  },
  verify(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (err) {
      return false;
    }
  }
};
