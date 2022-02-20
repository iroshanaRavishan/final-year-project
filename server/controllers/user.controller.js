const UserRegistration = require('../models/userRegistration.model')
const bcrypt = require('bcrypt');

/**
 * user inserting function
 * @param {*} user 
 * @returns 
 */
async function insert(user) {
    user.userHashedRegPassword = bcrypt.hashSync(user.userRegPassword, 10);
    delete user.userRegPassword;

    //make a DB call to save the users in the DB
    console.log('Saving the user to the DB', user);
    return await new UserRegistration(user).save();
}

/**
 * getting the user by emailId and password
 * @param {*} userRegUsername 
 * @param {*} userRegPassword 
 * @returns 
 */
async function getUserByEmailIdAndPassword(userRegEmail, userRegPassword) {
    let user = await UserRegistration.findOne({userRegEmail});

    if(isUserValid(user, userRegPassword, user.userHashedRegPassword)) {
        user = user.toObject();
        delete user.userHashedRegPassword;
        return user;
    } else {
        return null;
    }
}

/**
 * getting user by id
 * @param {*} id 
 * @returns 
 */
async function getUserById(id) {
    let user = await UserRegistration.findById(id);
    if(user) {
        user = user.toObject();
        delete user.userHashedRegPassword;
        return user;
    } else {
        return null;
    }
}

/**
 * checking user validation
 * @param {*} user 
 * @param {*} userRegPassword 
 * @param {*} userHashedRegPassword 
 * @returns 
 */
function isUserValid(user, userRegPassword, userHashedRegPassword) {
    return user && bcrypt.compareSync(userRegPassword, userHashedRegPassword);
}

module.exports = {
    insert,
    getUserByEmailIdAndPassword,
    getUserById
};