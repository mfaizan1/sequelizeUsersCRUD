'use strict';
module.exports = (sequelize, DataTypes) => {
  var FacebookTokens = sequelize.define('FacebookTokens', {
    id:{
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notNull: true
      },
    },
    sortId:{
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
     },
    tokenType: {
      type: DataTypes.STRING,
      unique: false,
      allowNull:false
     },
    fbId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
     }
  }, {});
  FacebookTokens.associate = function(models) {
    // associations can be defined here
  };
  return FacebookTokens;
};