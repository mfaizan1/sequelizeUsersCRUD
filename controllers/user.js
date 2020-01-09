'use strict';
const db = require('./../models');
const jwtHelper = require('./../utils/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Users {
  async signUp(req, res) {
    let passwrodHash;
    try {
      passwrodHash = await bcrypt.hash(req.body.password, saltRounds);
    } catch (error) {
      console.log('Error', error);
      res.status(500);
      return res.send({
        status: false,
        message: 'Sorry, couldn\'t create user, hashing failed'
      });
    }
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwrodHash
    })
      .then(user => {
        res.send({ status: true, message: 'user created succesfully' });
      })
      .catch(err => {
        console.log('Error', err);
        res.status(500);
        res.send({ status: false, message: 'Sorry , couldn\'t create user' });
      });
  }
  singIn = async (req, res) => {
    let user; 
    try {
      user  = await this.getUserDetails(req.body.email);
    } catch (error) {
      return res.send({
        status: false,
        message: 'Email or Password is incorrect, please provide correct password'
      });
    }
    
    try {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(404);
        return res.send({
          status: false,
          message: 'Email or Password is incorrect, please provide correct password'
        });
      }
      const token = jwtHelper.issue({ id: user.id });
      delete user.password;
      return res.send({ status: true, message: 'Singin successful', token, user });
    } catch (error) {
      console.log('Error', error);
      res.status(500);
      res.send({ status: false, message: 'Sorry , couldn\'t singin' });
    }
  }
  userDetails(req, res) {
    db.User.findOne({
      attributes: ['firstName', 'lastName', 'email'],
      where: {
        id: req.userId
      }
    }).then((result) => {
      const {firstName, lastName, email} = result;
      res.send({firstName, lastName, email, success: true});
    }).catch((err) => {
      console.log('Error', err);
      res.status(500);
      res.send({
        success: false,
        msgForUser: 'Internal server error',
        msgForDebugging: err
      });
    });

  }
  changePassword(req, res) {
    console.log(req.body);
    db.User.findOne({
      attributes: ['password'],
      where: {
        id: req.userId
      }
    }).then(async(result) => {
      console.log(result);
      const isPasswordCorrect = await bcrypt.compare(
        req.body.oldPassword,
        result.password
      );
      if (!isPasswordCorrect) {
        res.status(401);
        return res.send({
          status: false,
          message: 'Password in correct, please provide correct password'
        });
      }
      let passwrodHash;
      try {
        passwrodHash = await bcrypt.hash(req.body.newPassword, saltRounds);
      } catch (error) {
        console.log('Error', error);
        res.status(500);
        return res.send({
          status: false,
          message: 'Sorry, couldn\'t create user, hashing failed'
        });
      }
      db.User.update(
        { password: passwrodHash },
        {
          where: {
            id: req.userId
          }
        }).then((result) => {
        return res.send(
          {
            status: true,
            message: 'Pasword updated successfull'
          });
      }).catch((err) => {
        console.log('Error', err);
        res.status(500);
        res.send({ msgForUser: 'Internal server error', msgForDebugging: err });
      });
    }).catch((err) => {
      console.log('Error', err);
      res.status(500);
      res.send({ msgForUser: 'Internal server error', msgForDebugging: err });
    });

  }

  getUserDetails(email){
    return new Promise(async(resolve, reject) => {
      try {
        const user = await db.User.findOne({
          where: {
            email: email
          },
          attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture', 'password'],
          raw: true
        });
        if (user){
          resolve(user);
        }
        reject(404);
      } catch (error) {
        console.log('error: ', error);
        reject(error);
      }

    });
  }
}
module.exports = new Users();
