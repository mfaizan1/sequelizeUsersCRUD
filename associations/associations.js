'use strict';
const models = require('./../models');

const setAssociations = function() {
  models.User.hasMany(models.FacebookTokens, {as: 'fbTokens', foreignKey: 'userIntId'});
};
module.exports = setAssociations;

