const passport = require('passport'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    auth = require('./AuthService'),
    axios = require('axios');

require('dotenv').config({path: '../../.env'});
const authService = require('./AuthService.js');

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

    app.get('/auth/verify/:token/:id', function(req, res) {
        let userToken = req.params.token;
        let userId = req.params.id;

        if (authService.verifyToken(userToken, userId)) {
            res.json({response: 'ok'});
        }
        else {
            res.status(400).send({error: "tokens do not match"});
        }
    })

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
            userId: req.session.token.profile.id,
            token: req.session.token.token
        })
        .then(response => {
            console.log('ok');
        })
        .catch(error => {
            console.log('err');
        })

        res.redirect('http://localhost:3001/search/' + req.session.token.token + '/' +  req.session.token.profile.id) // final redirect to frontend
    });
}