/* Setup */
const express = require('express'),
    app = express(),
    passport = require('passport'),
    
    auth = require('./src/auth/AuthService');

/* Exposed endpoints */
require('./src/auth/AuthController')(app);

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    next();
});

// ----------------------------------------------- 
app.get('/', function(req, res) {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set',
            // "token": req.session.token
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
})

app.use('/static', express.static('public'));

app.listen(app.get('port'), function() {
    console.log('Express started...')
    console.log('on port' + app.get('port'));
});