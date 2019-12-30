'use strict';
const users = require('./controllers/user');
const socialAuths = require('./controllers/socialAuths');
const checkToken = require('./utils/tokenAuth').checkToken;
var passport = require('passport');
require('./passport')();

module.exports = function(app) {

  app.post('/user/signup', users.signUp);
  app.post('/user/signin', users.singIn);
  app.get('/user', checkToken, users.userDetails);
  app.put('/user/password', checkToken, users.changePassword);

  // social auths
  app.post('/auth/facebook',
    passport.authorize('facebook-token', {session: false}),
    socialAuths.fbAuth);
}
;
