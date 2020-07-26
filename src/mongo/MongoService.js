// TODO: Finish the rest of the CRUD operations
const {MongoClient, connect} = require('mongodb');

/* Load env variables */
require('dotenv').config({path: '../../.env'});

async function openConnectionToMongo(uri) {
    const client = new MongoClient(uri);

    /* Connect to DB */
    try {
        await client.connect();
        return client;
    } catch (e) {
        throw e;
    }
}

async function closeConnectionToMongo(client) {
    await client.close();
}

/*
Returns databses in a MongoDB connection
Params: client object
Return: String array of db names on success, empty array on failure
*/
async function listDatabases(client) {
    return client.db().admin().listDatabases()
    .then(result => {
        var dbStrings = [];
        result.databases.forEach(db => dbStrings.push(db.name));
        return dbStrings;
    })
    .catch(err => []);
}

/*
Creates entry in databses in a MongoDB connection
Params: client oject, string of the name of db to insert to, collection to insert to, array of objects to be inserted
Return: Array of insert ids on success, empty array on failure
*/
async function insertIntoDatabase(client, db, collection, toInsert) {
    return client.db(db).collection(collection).insertMany(toInsert)
    .then(result => {
        return result.insertedIds;
    })
    .catch(err => {
        console.log(err);
        return [];
    })
}

/*
Reads from database, returning all matches of a certain criteria (simple matches)
Params: client oject, string of the name of db to search, collection to insert to
Return: Array of matched objcts on success, empty array on failure
*/
async function searchDatabase(client, db, collection, toInsert) {
    // TODO
}

async function updateDatabase(client, db, collection, toInsert) {
    // TODO
}

async function deleteFromDatabase(client, db, collection, toInsert) {
    // TODO
}

// Test method
async function main(client) {
    client = await openConnectionToMongo(process.env.MONGO_URI);
    // var dbs = await listDatabases(client);

    var dbs = await insertIntoDatabase(client, "testhack", "test", [{"test2" :"test"}]);

    console.log(dbs);
    await closeConnectionToMongo(client);
}

main();