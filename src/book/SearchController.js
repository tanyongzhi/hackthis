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

            // get data from google books
            let googleData = await searchService.searchGoogleBooks(bookQuery);

            try {
                let test = googleData.data.items[0].volumeInfo;
            } catch(err) {
                next(err);
                return;
            }

            let googleResults = []
            for (var i = 0; i < 10; i++) {
                let volumeInfo = googleData.data.items[i].volumeInfo;
                let saleInfo = googleData.data.items[i].saleInfo;
                // if (saleInfo.saleability == 'NOT_FOR_SALE') {
                //     continue;
                // }

                let isbn = volumeInfo.industryIdentifiers[0].identifier;
                let price = saleInfo.listPrice!= undefined ? saleInfo.listPrice.amount : Infinity;
                let currBooksData = {}
                currBooksData.title = volumeInfo.title;
                if (volumeInfo.subtitle != undefined) {
                    currBooksData.title += ' ' + volumeInfo.subtitle;
                }
                currBooksData.imageLink = volumeInfo.imageLinks.thumbnail;
                currBooksData.authors = volumeInfo.authors;
                currBooksData.isbn = isbn;
                currBooksData.price = price;
                currBooksData.link = saleInfo.buyLink;
                currBooksData.description = volumeInfo.description;

                googleResults.push(currBooksData);
            }

            // get array of isbn codes
            let isbnArr = []
            for (var i in googleResults) {
                isbnArr.push(googleResults[i].isbn)
            }

            // now, we search goodreads
            let goodReadsResult = await searchService.searchGoodReadsArray(isbnArr);
            let final = []
            for (var i in goodReadsResult) {
                let currentGoodReadsResult = goodReadsResult[i];
                let currentGoogleResult = googleResults[i];

                currentGoodReadsResult = JSON.parse(currentGoodReadsResult);
                let currEntry = currentGoodReadsResult.GoodreadsResponse.search.results.work;

                let finalEntry = {}
                finalEntry.title = currentGoogleResult.title;
                finalEntry.authors = currentGoogleResult.authors;
                try {
                    finalEntry.rating = currEntry.average_rating._text;
                    finalEntry.numRatings = currEntry.ratings_count._text;
                }
                catch {
                    continue;
                }
                finalEntry.isbn = currentGoogleResult.isbn;
                finalEntry.googlePrice = currentGoogleResult.price;
                finalEntry.link = currentGoogleResult.link;
                finalEntry.description = currentGoogleResult.description;
                finalEntry.imageLink = currentGoogleResult.imageLink;

                final.push(finalEntry);
            }

            // get amazon data
            await getAmazonData(final);
            console.log(final)
            
            // final value calculation
            for (var i in final) {
                final[i].value = searchService.assignValue([final[i].googlePrice, final[i].amazonPrice], [[final[i].rating, final[i].numRatings], [final[i].amazonRating, final[i].numRatings]]);
            }

            final = final.filter((value, index, arr) => {
                return value.amazonPrice != Infinity || value.googlePrice != Infinity;
            })

            final.sort((GetSortOrder('value')));
            res.json(final);
        }
    })
}

async function getAmazonData(final) {
    let nameArr = []
    for (var i in final) {
        nameArr.push(final[i].title + ' ' + final[i].authors[0]);
    }

    let amazonResult = await searchService.searchAmazonArray(nameArr);
    console.log(amazonResult);

    for (var i in final) {
        if (amazonResult[i][0] == undefined) {
            continue;
        }
        try {
            final[i].amazonPrice = amazonResult[i][0]._prices[0].price;
            final[i].amazonLink = 'amazon.com' + amazonResult[i][0]._productUrl;
        }
        catch {
            final[i].amazonPrice = Infinity;
            final[i].amazonLink = undefined;
        }
    }
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