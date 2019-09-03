const users = require('./controllers/user')
module.exports = function(app){

    app.post('/user/signup', users.signUp);
    app.post('/user/signin', users.singIn)
}