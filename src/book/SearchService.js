const axios = require('axios'),
    convert = require('xml-js'),
    {searchAmazon, AmazonSearchResult} = require('unofficial-amazon-search');

require('dotenv').config({path: '../../.env'});

const GOODREADS_URL = 'https://www.goodreads.com/search';
const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes'

async function searchGoodreads(query) {
    return await axios.get(GOODREADS_URL, {
        params: {
            q: query,
            key: process.env.GOODREADS_KEY
        }
    })
    .then(function(response) {
        let data = convert.xml2json(response.data, {compact: true, spaces: 4});
        return data;
    })
    .catch(function(error) {
        return error;
    })
}

async function searchGoogleBooks(query) {
    return await axios.get(GOOGLE_BOOKS_URL, {
        params: {
            q: query,
            maxResults: 25,
            key: process.env.GOOGLE_BOOKS_API_KEY
        }
    })
    .catch(function(error) {
        return error;
    })
}

async function searchGoodReadsArray(query) {
    let arr = []
    for (var i in query) {
        arr.push(axios.get(GOODREADS_URL, {
            params: {
                q: query[i],
                key: process.env.GOODREADS_KEY
            }}))
    }
    return axios.all(arr)
    .then(axios.spread((...responses) => {
        let result = []
        for (var i in responses) {
            let data = convert.xml2json(responses[i].data, {compact: true, spaces: 4});
            result.push(data)
        }
        return result
    }));
}

async function searchEbayArray(query) {
    const CLIENT_ID = process.env.EBAY_CLIENT_ID;
    const CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET;

    let data = CLIENT_ID + ':' + CLIENT_SECRET;
    let base64data = Buffer.from(data).toString('base64');

    const oAuthData = {
        grant_type: "client_credentials",
        scope: 'https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope'
    }

    let accessToken = await axios.post('https://api.ebay.com/identity/v1/oauth2/token', 'grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + base64data
        }
    });
    accessToken = accessToken.data.access_token;

    let arr = []
    for (var i in query) {
        arr.push(searchEbay(query[i], accessToken))
    }

    return Promise.all(arr);
}

function searchEbay(query, accessToken) {
    let config = {
        headers: {
        Authorization: 'Bearer ' + accessToken
        },
        params: {
            q: query,
            limit: 2,
            filter: [{field: 'condition', value: 'NEW'}]
        }
    }
        
    return axios.get('https://api.ebay.com/buy/browse/v1/item_summary/search',config)
    .catch(err => console.log(err.response.data))
}

function searchAmazonArray(query) {
    let arr = []
    for (var i in query) {
        console.log(query[i]);
        arr.push(searchAmazon(query[i]));
    }

    return Promise.all(arr);
}

// price: array of prices
// ratings: array of [rating, numRatings] array
function assignValue(price, rating) {
    price.forEach(elem => parseFloat(elem));
    rating.forEach(elem => elem.forEach(elem2 => parseFloat(elem2)));

    let minPrice = Math.min(price);
    let totalNumRatings = rating.reduce((acc, curr) => acc + curr[1], 0);
    let weightedTotal = rating.reduce((acc, curr) => acc + (curr[1]*curr[0]), 0);
    let finalAverage = weightedTotal/totalNumRatings;

    return finalAverage/minPrice;
}

module.exports = {
    searchGoodreads: searchGoodreads,
    searchGoogleBooks: searchGoogleBooks,
    assignValue: assignValue,
    searchGoodReadsArray: searchGoodReadsArray,
    searchAmazonArray: searchAmazonArray,
    searchEbayArray: searchEbayArray
}