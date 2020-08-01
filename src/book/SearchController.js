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
            data = JSON.parse(data);
            arr = {}
            arr.books = []
            // console.log(data.GoodreadsResponse.search.results.work);
            for (var i in data.GoodreadsResponse.search.results.work) {
                let currData = data.GoodreadsResponse.search.results.work[i];
                arr.books.push(currData.best_book.title);
            }
            // data.GoodreadsResponse.search.results.work.foreach(element => arr.books.add(element.best_book.title));
            // console.log(arr);
            res.json(arr);
            // res.json(data.GoodreadsResponse.search.results.work);
        }
    })

}