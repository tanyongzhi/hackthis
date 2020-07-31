const passport = require('passport'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    auth = require('./AuthService'),
    axios = require('axios');

require('dotenv').config({path: '../../.env'});

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
    app.get('/auth-complete', async function(req, res) {
        // make POST call to /user endpoint in backend to
        // update the database with newly created token
        await axios.post(process.env.BACKEND_URL + '/user', {
            firstName: req.session.token.profile.name.givenName,
            lastName: req.session.token.profile.name.familyName,
            userId: req.session.token.profile.id
        })
        .then(response => {
            console.log('ok');
        })
        .catch(error => {
            console.log('err');
        })

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

        res.redirect('http://localhost:3001/search/' + req.session.token.profile.id) // final redirect to frontend
    });
}