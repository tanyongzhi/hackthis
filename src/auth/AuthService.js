const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/* Load env variables */
require('dotenv').config()
const mongoService = require('../mongo/MongoService.js');

CALLBACK_URL='http://localhost:3000/auth/google/callback'

async function verifyToken(token, id) {
    let client = await mongoService.openConnectionToMongo(process.env.MONGO_URI);

    let result = await mongoService.searchDatabase(client, process.env.DB, 'users', {userId: id});
    mongoService.closeConnectionToMongo(client);

    return result.length == 1;
}

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: CALLBACK_URL
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};

module.exports.verifyToken = verifyToken;