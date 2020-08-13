/* Setup */
const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./src/auth/AuthService');
    cors = require('cors');

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/* Exposed endpoints */
require('./src/auth/AuthController')(app);
require('./src/user/UserController')(app);
require('./src/book/SearchController')(app);

// ----------------------------------------------- 
app.get('/', function(req, res) {
    res.json({token: req.session.token});
})

app.listen(app.get('port'), function() {
    console.log('Express started...')
    console.log('on port' + app.get('port'));
});


function errorHandler (err, req, res, next) {
    console.log("HANDLING ERRORS!!!!!!!!")
    res.status(500)
    res.json("error!");
  }

app.use(errorHandler)