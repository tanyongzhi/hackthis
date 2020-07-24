const passport = require('passport'),
    auth = require('./AuthService');

module.exports = function(app) {
    auth(passport);
    app.use(passport.initialize());
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        (req, res) => {console.log('redirected')}
    );
}