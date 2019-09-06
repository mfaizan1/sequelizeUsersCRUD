const users = require('./controllers/user');
const checkToken = require('./utils/tokenAuth').checkToken;
module.exports = function(app){

    app.post('/user/signup', users.signUp);
    app.post('/user/signin', users.singIn);
    app.get('/user',checkToken, users.userDetails);
    app.put('/user/password',checkToken, users.changePassword);
}