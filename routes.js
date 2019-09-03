const users = require('./controllers/user')
module.exports = function(app){

    app.post('/user', users.signUp);
}