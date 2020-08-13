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
            try {
                var googleResults = await searchGoogle(bookQuery);
            }
            catch(err) {
                console.log(err);
                next();
                return;
            }

            // get array of isbn codes
            var isbnArr = [];
            for (var i in googleResults) {
                isbnArr.push(googleResults[i].isbn);
            }

            // now, we search goodreads
            try {
                var final = await searchGoodreads(isbnArr, googleResults);
            }
            catch(err) {
                console.log(err);
                next();
                return;
            }

            // get amazon data
            try {
                await getAmazonData(final);
            }
            catch(err) {
                console.log(err);
                next();
                return;
            }

            // search ebay
            try {
                await searchEBay(final);
            }
            catch(err) {
                console.log(err);
                next();
                return;
            }
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
    let nameArr = [];
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

async function searchGoogle(bookQuery) {
    let googleData = await searchService.searchGoogleBooks(bookQuery);

    let test = googleData.data.items[0].volumeInfo;

    let googleResults = [];
    for (var i = 0; i < 10; i++) {
        let volumeInfo = googleData.data.items[i].volumeInfo;
        let saleInfo = googleData.data.items[i].saleInfo;

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

    return googleResults;
}

async function searchGoodreads(isbnArr, googleResults) {
    let goodReadsResult = await searchService.searchGoodReadsArray(isbnArr);
    let final = [];
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
    
    return final;
}

async function searchEBay(final) {
    let nameArr = [];
    for (var i in final) {
        nameArr.push(final[i].title + ' ' + final[i].authors[0]);
    }

    let eBayResult = await searchService.searchEbayArray(nameArr);

    for (var i in final) {
        try {
            final[i].eBayPrice = eBayResult[i].data.itemSummaries[0].price.value;
            final[i].eBayLink = eBayResult[i].data.itemSummaries[0].itemWebUrl;
        }
        catch(err) {
            final[i].eBayPrice = Infinity;
            final[i].eBayLink = undefined;
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