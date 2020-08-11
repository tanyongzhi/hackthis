var User = require('./UserService.js').User;
var mongoService = require('../mongo/MongoService.js');

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

    app.get('/books/:id', async function(req, res, next) {
        let id = req.params.id;
        let response = await User.retrieveDb(id);
        
        if (response.length == 0) {
            return res.status(400).send('error!');
        }

        req.response = response;
        next()
    } ,function (req, res) {
        let response = req.response;
        return res.json(response[0].books);
    })

    app.post('/books/insert', function(req, res, next) {
        if (req.body.toInsert.length == 0) {
            return res.status(400).send('error!');
        }
        
        next();
    }, async function(req, res, next) {
        let id = req.body.id;
        let toInsert = req.body.toInsert;

        User.insertDb(id, toInsert)
        .then(res.json('ok'))
        .catch((err) =>{
            console.log(err);
            next();
        })
    })

    app.post('/books/delete', async function (req, res, next) {
        if (req.body.isbn.length == 0) {
            return res.status(400).send('error!');
        }
        
        next();
    }, async function(req, res, next) {
        let id = req.body.id;
        let isbn = req.body.isbn;

        User.deleteDb(id, isbn)
        .then(res.json('ok'))
        .catch((err) => {
            console.log(err);
            next();
        })
    })
}