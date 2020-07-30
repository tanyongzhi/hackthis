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

// ----------------------------------------------- 
app.get('/', function(req, res) {
    res.json({token: req.session.token});
})

app.use('/static', express.static('public'));

app.listen(app.get('port'), function() {
    console.log('Express started...')
    console.log('on port' + app.get('port'));
});