const searchService = require('./SearchService');

module.exports = function(app) {
    app.get('/search', async function(req, res, next) {
        if (req.query == undefined || req.query.length == 0) {
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
            goodreadsResult = [];
            for (var i in data.GoodreadsResponse.search.results.work) {
                let currEntry = data.GoodreadsResponse.search.results.work[i];
                let currBookData = {}
                currBookData.author = currEntry.best_book.author.name._text;
                currBookData.title = currEntry.best_book.title._text;
                currBookData.rating = currEntry.average_rating._text;
                currBookData.numRatings = currEntry.ratings_count._text; 
                goodreadsResult.push(currBookData);
            }

            // search for corresponding prices on Google Books
            let final = []
            for (var j = 0; j < 5; j++) {
                let googleData = await searchService.searchGoogleBooks(goodreadsResult[j].title, goodreadsResult[j].author);
                let result;
                for (var i in googleData.data.items) { 
                    if (googleData.data.items[i].saleInfo.saleability == 'FOR_SALE' && googleData.data.items[i].volumeInfo.language == 'en' ) {
                        result = googleData.data.items[i];

                        finalEntry = {}
                        finalEntry.title = goodreadsResult[j].title;
                        finalEntry.rating = goodreadsResult[j].rating;
                        finalEntry.numRatings = goodreadsResult[j].numRatings;
                        finalEntry.averagePrice = result.saleInfo.listPrice.amount;
                        finalEntry.imageLink = result.volumeInfo.imageLinks.thumbnail;
                        finalEntry.description = result.volumeInfo.description;
                        finalEntry.link = result.saleInfo.buyLink;

                        final.push(finalEntry);
                        break;
                    }
                }
            }

            // final value calculation
            for (var i in final) {
                final[i].value = searchService.assignValue([final[i].averagePrice], [[final[i].rating, final[i].numRatings]]);
            }
            
            final.sort((GetSortOrder('value')));
            res.json(final);
        }
    })
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return -1;    
        } else if (a[prop] < b[prop]) {    
            return 1;    
        }    
        return 0;    
    }    
}    