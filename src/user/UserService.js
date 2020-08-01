const mongoService = require('../mongo/MongoService.js');
require('dotenv').config();

class User {
    DB = process.env.DB;
    USER_COLLECTION = 'users';

    constructor(firstName, lastName, userId, token) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
        this.token = token;
    }

    async udpateDb() {
        let client = await mongoService.openConnectionToMongo(process.env.MONGO_URI);

        let result = await mongoService.updateDatabase(client, this.DB, this.USER_COLLECTION, {userId: this.userId}, {firstName: this.firstName, 
        lastName: this.lastName, userId: this.userId, token: this.token});
        mongoService.closeConnectionToMongo(client);

        if (result == []) {
            return false;
        }
        else {
            return true;
        }
    }
}

module.exports = {
    User: User
}