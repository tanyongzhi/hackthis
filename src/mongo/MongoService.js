const {MongoClient, connect} = require('mongodb');

/* Load env variables */
require('dotenv').config({path: '../../.env'});

async function connectToMongo(uri) {
    const client = new MongoClient(uri);
    /* Connect to DB */
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    dbList = await client.db().admin().listDatabases();

    console.log("Dabtases:");
    dbList.databases.forEach(db => console.log(` -${db.name}`));
}

connectToMongo(process.env.MONGO_URI);