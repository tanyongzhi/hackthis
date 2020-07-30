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
        function (req, res) {
            req.session.token = req.user;
            res.redirect('/auth-complete') 
        }
    );

    /*
    Complete the auth flows by updating the releavant databases
    */
    app.get('/auth-complete', function(req, res) {
        // posts user database with new id token

        // if (req.session.token) {
        //     res.cookie('token', req.session.token);
        //     res.json({
        //         status: 'session cookie set',
        //         token: req.session.token
        //     });
        // } else {
        //     res.cookie('token', '')
        //     res.json({
        //         status: 'session cookie not set'
        //     });
        // }

        res.redirect('/') // final redirect to frontend
    });
}