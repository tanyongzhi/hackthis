const axios = require('axios'),
    convert = require('xml-js');
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
            key: process.env.GOOGLE_BOOKS_API_KEY
        }
    })
    .catch(function(error) {
        return error;
    })
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
    assignValue: assignValue
}