const searchService = require('./SearchService');

module.exports = function(app) {
    app.get('/search', async function(req, res) {
        if (req.query == undefined) {
            res.status(400).send({error: "no query string specified"});
            return;
        }
        else if (req.query.length > 1) {
            res.status(400).send({error: "unknown params provided"});
            return;
        }
        else {
            let data = await searchService.searchGoodreads(req.query.query);
            console.log(data);
            res.json(data);
        }
    })

}