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
Params: client oject, string of the name of db to insert to, string of collection to insert to, array of objects to be inserted
Return: Response object from mongo
*/
async function insertIntoDatabase(client, db, collection, toInsert) {
    return client.db(db).collection(collection).insertMany(toInsert)
    .catch(err => {
        console.log(err);
        return [];
    })
}

/*
Reads from database, returning all matches of a certain criteria (simple matches)
Params: client oject, string of the name of db to search, string of collection to insert to, json object of query
Return: Array of matched objcts on success, empty array on failure
*/
async function searchDatabase(client, db, collection, toSearch) {
    return client.db(db).collection(collection).find(toSearch)
    .toArray();
}

/*
Updates one field in a database, creates document if it doesn't already exist
Params: client oject, string of the name of db to search, string of collection to insert to, key val pair to update, updated key val pairs 
Return: Response object
*/
async function updateDatabase(client, db, collection, toUpdate, updatedPair) {
    return client.db(db).collection(collection).updateOne(toUpdate, {$set: updatedPair}, {upsert: true});
}

/*
Deletes one entry in a database
Params: client oject, string of the name of db to search, string of collection to insert to, key val pair to delete
Return: Response object
*/
async function deleteFromDatabase(client, db, collection, toDelete) {
    return client.db(db).collection(collection).deleteOne(toDelete);
}

// Test method
async function main(client) {
    client = await openConnectionToMongo(process.env.MONGO_URI);
    // var dbs = await listDatabases(client);

    // var dbs = await insertIntoDatabase(client, "testhack", "test", [{"test2" :"test"}]);
    // var dbs = await searchDatabase(client, "testhack", "test", {test2: 'test'});
    // var dbs = await updateDatabase(client, "testhack", "test", {test2: 'test'}, {test2: 'test2', sample: "sample"});
    // var dbs = await deleteFromDatabase(client, "testhack", "test", {test2: 'test2'});

    await closeConnectionToMongo(client);
}

module.exports = {
    openConnectionToMongo: openConnectionToMongo,
    listDatabases: listDatabases,
    insertIntoDatabase: insertIntoDatabase,
    searchDatabase: searchDatabase,
    deleteFromDatabase, deleteFromDatabase,
    updateDatabase: updateDatabase,
    closeConnectionToMongo: closeConnectionToMongo
};