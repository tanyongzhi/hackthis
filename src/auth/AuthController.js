const passport = require('passport'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    auth = require('./AuthService');

module.exports = function(app) {
    auth(passport);
    app.use(passport.initialize());
    app.use(cookieSession({
        name: 'session',
        keys: ['123']
    }));
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        (req, res) => {
            req.session.token = req.user.token;
            res.redirect('/') // TODO: Add a proper auth redirect page`
        }
    );
}