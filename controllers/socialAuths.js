/* eslint-disable strict */


class SocialAuths {
  fbAuth(req, res, next){

    console.log(req.accessToken, req.profile, 'hola');
    // if (!req.user) {
    //   return res.send(401, 'User Not Authenticated');
    // }
    // req.auth = {
    //   id: req.user.id
    // };
    // next();
  };

}

module.exports = new SocialAuths();
