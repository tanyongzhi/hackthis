const passport = require('passport'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    auth = require('./AuthService');

module.exports = function(app) {
    app.get("/update-token")
}