const axios = require('axios'),
    convert = require('xml-js');
require('dotenv').config({path: '../../.env'});

async function searchGoodreads(query) {
    return await axios.get('https://www.goodreads.com/search', {
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

module.exports = {
    searchGoodreads: searchGoodreads
}