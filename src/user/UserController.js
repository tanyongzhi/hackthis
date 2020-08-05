let User = require('./UserService.js').User;

module.exports = function(app) {
    app.post('/user', function(req, res) {
        // check body params validity
        let params = req.body;
        let currentUser = new User(params.firstName, params.lastName, params.userId, params.token);
        if (currentUser.firstName == undefined || currentUser.lastName == undefined || currentUser.userId == undefined || currentUser.token == undefined) {
            res.status(400).send({error: 'missing args'});
            return;
        }

        // update db
        if (currentUser.udpateDb()) {
            res.json({response: 'ok'});
        }
        else {
            res.status(500).send({error: 'unknown error occured'});
        }
    })
}