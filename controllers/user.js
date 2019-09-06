const db = require("./../models");
const jwtHelper = require("./../utils/jwt");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class Users {
  async signUp(req, res) {
    let passwrodHash;
    try {
      passwrodHash = await bcrypt.hash(req.body.password, saltRounds);
    } catch (error) {
      console.log("Error", err);
      res.status(500);
      return res.send({
        status: false,
        message: "Sorry, couldn't create user, hashing failed"
      });
    }
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwrodHash
    })
      .then(user => {
        res.send({ status: true, message: "user created succesfully" });
      })
      .catch(err => {
        console.log("Error", err);
        res.status(500);
        res.send({ status: false, message: "Sorry , couldn't create user" });
      });
  }
  singIn(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(async result => {
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          result.password
        );
        if (!isPasswordCorrect) {
          res.status(401);
          return res.send({
            status: false,
            message: "Password in correct, please provide correct password"
          });
        }
        const token = jwtHelper.issue({id: result.id});
        res.send({ status: true, message: "Singin successful", token });
      })
      .catch(err => {
        console.log("Error", err);
        res.status(500);
        res.send({ status: false, message: "Sorry , couldn't singin" });
      });
  }
  userDetails(req, res){
    db.User.findOne({
      attributes: [`firstName`,`lastName`,`email`],
      where:{
        id : req.userId
      }
    }).then((result) => {
      res.send(result);
    }).catch((err) => {
      
    });

  }
}
module.exports = new Users();
