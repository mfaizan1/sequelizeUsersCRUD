module.exports = function(app){

    app.post('/test1', function(req, res){
        res.send('hello')
    });
}