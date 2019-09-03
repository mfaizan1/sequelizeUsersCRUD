const db = require("./../models");
var bcrypt = require("bcrypt");
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
}
module.exports = new Users();
