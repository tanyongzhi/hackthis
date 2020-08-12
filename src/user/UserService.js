const mongoService = require('../mongo/MongoService.js');
require('dotenv').config();

const BOOK_COLLECTION = 'books';
const DB = process.env.DB;
class User {
    DB = process.env.DB;
    USER_COLLECTION = 'users';

    constructor(firstName, lastName, userId, token) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
        this.token = token;
        this.books = undefined;
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

    static async retrieveDb(id) {
        let client = await mongoService.openConnectionToMongo(process.env.MONGO_URI);

        let result = await mongoService.searchDatabase(client, DB, BOOK_COLLECTION, {userId: id})

        mongoService.closeConnectionToMongo(client);
        
        return result;
    }

    static async insertDb(id, toInsert) {
        let client = await mongoService.openConnectionToMongo(process.env.MONGO_URI);

        let currBooks = await mongoService.searchDatabase(client, DB, BOOK_COLLECTION, {userId: id});

        let newBooks;
        if (currBooks.length == 0) {
            newBooks = [toInsert];
        }
        else {
            // only insert if current book is not present in db
            let shouldInsert = true;
            for (var i in currBooks[0].books) {
                console.log(currBooks[0].books[i]);
                if (toInsert.isbn == currBooks[0].books[i].isbn) {
                    shouldInsert = false;
                    break;
                }
            }
            if (shouldInsert) {
                newBooks = [toInsert].concat(currBooks[0].books);
            }
            else {
                newBooks = currBooks[0].books;
            }
        }

        let result = mongoService.updateDatabase(client, DB, BOOK_COLLECTION, {userId: id}, {books: newBooks});

        mongoService.closeConnectionToMongo(client);
        
        return result;
    }

    static async deleteDb(id, isbn) {
        let client = await mongoService.openConnectionToMongo(process.env.MONGO_URI);

        let currBooks = await mongoService.searchDatabase(client, DB, BOOK_COLLECTION, {userId: id});

        if (currBooks.length == 0) {
            return;
        }
        else {
            for (var i in currBooks[0].books) {
                if (isbn == currBooks[0].books[i].isbn) {
                    delete currBooks[0].books[i];
                    break;
                }
            }
        }

        let result = mongoService.updateDatabase(client, DB, BOOK_COLLECTION, {userId: id}, {books: currBooks[0].books});

        mongoService.closeConnectionToMongo(client);
        
        return result;
    }
}

module.exports = {
    User: User
}
