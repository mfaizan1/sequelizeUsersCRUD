'use strict';

var passport = require('passport');
// var TwitterTokenStrategy = require('passport-twitter-token');
var FacebookTokenStrategy = require('passport-facebook-token');
// var GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('./config/serverConfig.json');

module.exports = function() {


  passport.use(new FacebookTokenStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret
  },
  function(accessToken, refreshToken, profile, done) {
    const user = {accessToken, profile};
    return done(null, user);
  }));

  //   passport.use(new TwitterTokenStrategy({
  //     consumerKey: config.twitterAuth.consumerKey,
  //     consumerSecret: config.twitterAuth.consumerSecret,
  //     includeEmail: true
  //   },
  //   function(token, tokenSecret, profile, done) {
  //     User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
  //       return done(err, user);
  //     });
  //   }));

//   passport.use(new GoogleTokenStrategy({
//     clientID: config.googleAuth.clientID,
//     clientSecret: config.googleAuth.clientSecret
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
//       return done(err, user);
//     });
//   }));
};
