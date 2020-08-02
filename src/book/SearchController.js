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
            let bookQuery = req.query.query;

            // get data from goodreads
            let data = await searchService.searchGoodreads(bookQuery);
            data = JSON.parse(data);
            books = []
            for (var i in data.GoodreadsResponse.search.results.work) {
                let currData = data.GoodreadsResponse.search.results.work[i];
                books.push(currData.best_book.title);
            }
            console.log(books);

            // search for corresponding prices on Google Books
            let final = []
            for (var j = 0; j < 5; j++) {
                let googleData = await searchService.searchGoogleBooks(books[j]._text);
                console.log(books[j]._text);
                let result;
                for (var i in googleData.data.items) { 
                    if (googleData.data.items[i].saleInfo.saleability == 'FOR_SALE') {
                        result = googleData.data.items[i];
                        final.push(result)
                        break;
                    }
                }
            }
            res.json(final);
        }
    })

}