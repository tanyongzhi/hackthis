var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    next();
});

// ----------------------------------------------- 
app.get('/', function(req, res) {
    res.render('home');
})

app.get('/about', function(req, res) {
    console.log('hit');
})

app.listen(app.get('port'), function() {
    console.log('Express started...')
    console.log('on port' + app.get('port'));
});