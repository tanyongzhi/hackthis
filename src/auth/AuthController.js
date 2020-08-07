const cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    auth = require('./AuthService'),
    axios = require('axios');

require('dotenv').config({path: '../../.env'});
const authService = require('./AuthService.js');


module.exports = function(app) {
    app.use(cookieSession({
        name: 'session',
        keys: ['123']
    }));

    app.get('/auth/verify/:token/:id', async function(req, res) {
        let userToken = req.params.token;
        let userId = req.params.id;

        await authService.verifyToken(userToken, userId)
        .then(result => {
            console.log('success!');
            res.json({response: 'ok'})})
        .catch(err => {
            console.log(err);
            res.status(400).send({error: "tokens do not match"});
        })
    })
}
