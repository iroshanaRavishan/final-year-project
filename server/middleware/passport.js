const passport = require('passport');
const LocalStrategy = require('passport-local'); // validate the user locally
const JwtStrategy = require('passport-jwt').Strategy; // verify whether jwt is in the request
const ExtractJWT = require('passport-jwt').ExtractJwt;

const config = require('../config/config');
const userController = require('../controllers/user.controller');

const localLogin = new LocalStrategy(
    { usernameField: 'userRegUsername' },
    async (userRegUsername, userRegPassword, done) => {
        const user = userController.getUserByEmailIdAndPassword(userRegUsername, userRegPassword);
        return user? done(null, user): done(null, false, {
            error: 'Your login credentials are not valid. Please try again.'
        });
    }
);

const jwtLogin = new JwtStrategy(
    { jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey: config.jwtSecret },
    async (payload, done) => {
        const user = await userController.getUserById(payload._id);
        return user? done(null, user): done(null, false, {
            error: 'Your login credentials are not valid. Please try again.'
        });
    }
);

module.exports = passport.use(localLogin).use(jwtLogin);