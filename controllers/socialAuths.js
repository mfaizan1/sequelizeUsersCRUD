/* eslint-disable strict */
const db = require('./../models');
const jwtHelper = require('./../utils/jwt');

class SocialAuths {
  async fbAuth(req, res){
    const {
      account: {
        accessToken,
        profile: {id, emails, photos,
          name: {givenName, familyName}
        }
      }
    } = req;
    let email, profilePicture;
    if (photos.length !== 0){
      profilePicture = photos[0].value;
    }
    if (emails.length !== 0){
      email = emails[0].value;
    }

    let transaction;

    try {


      const userExists = await db.User.findOne(
        {
          where: {email},
          include: [{
            model: db.FacebookTokens,
            as: 'fbTokens',
            where: {
              fbId: id
            }
          }]
        });

      if (userExists){
        const token = jwtHelper.issue({ id: userExists.id });
        return res.send({ status: true, message: 'Singin successful', token });
      }
      transaction = await db.sequelize.transaction();
      const user = await db.User.create({
        firstName: givenName,
        lastName: familyName,
        email,
        profilePicture
      }, {transaction});
      const fb = await db.FacebookTokens.create({
        token: accessToken,
        tokenType: 'access',
        fbId: id,
        userIntId: user.sortId
      }, {transaction});
      await transaction.commit();
      const token = jwtHelper.issue({ id: user.id });
      return res.send({ status: true, message: 'Singin successful', token });
    } catch (err) {
      if (transaction) await transaction.rollback();
      console.log('Error', err);
      res.status(500);
      res.send({ status: false, message: 'Sorry , couldn\'t create user' });
    }
  };

}

module.exports = new SocialAuths();
