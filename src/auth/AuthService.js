const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/* Load env variables */
require('dotenv').config()
const mongoService = require('../mongo/MongoService.js');
const {OAuth2Client} = require('google-auth-library');

CALLBACK_URL='http://localhost:3000/auth/google/callback'

async function verifyToken(token, id) {
    const client = new OAuth2Client(process.envCLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];
    if (userid != id) {
        throw new Error('IDs do not match');
    }
}

module.exports.verifyToken = verifyToken;
