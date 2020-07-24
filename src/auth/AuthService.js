const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/* Load env variables */
require('dotenv').config()

CALLBACK_URL='http://localhost:3000/auth/google/callback'

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