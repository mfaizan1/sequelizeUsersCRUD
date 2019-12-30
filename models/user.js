'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    sortId:{
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
     type: DataTypes.STRING,
     unique: false,
     allowNull:false,
     validate:{
      len:[1,50]
     }
    },
    lastName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull:false,
      validate:{
       len:[1,50]
      }
    },
    email:{
     type: DataTypes.STRING,
     unique: true,
     allowNull:false,
     validate:{
      len:[6,100],
      isEmail: true,
     }
    } ,
    password: {
     type: DataTypes.STRING,
     allowNull:true,
     validate:{
        notEmpty:true,
        len:[8,300]
     }
    },
    profilePicture: {
      type: DataTypes.STRING,
      unique: false,
      allowNull:false
      }
}, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};