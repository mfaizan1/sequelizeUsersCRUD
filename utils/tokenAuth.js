
let jwt = require('jsonwebtoken');
const config = require("../config/serverConfig.json");
const jwtHelper = require('./jwt')

let checkToken = (req, res, next) => {
  let token = req.headers['authorization'];
  console.log(token) ;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    const isVerified  = jwtHelper.verify(token);
    if(isVerified){
      req.userId = isVerified.id;
      next();
    } else {
      return res.json({
        success: false,
        message: 'Token is not valid'
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}