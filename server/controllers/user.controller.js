const UserRegistration = require('../models/userRegistration.model')
const bcrypt = require('bcrypt');


async function insert(user) {

    user.userHashedRegPassword = bcrypt.hashSync(user.userRegPassword, 10);
    delete user.userRegPassword;

    //make a DB call to save the users in the DB
    console.log('Saving the user to the DB', user);
    return await new UserRegistration(user).save();
}

async function getUserByEmailIdAndPassword(userRegUsername, userRegPassword) {
    let user = await UserRegistration.findOne({userRegUsername});

    if(isUserValid(user, userRegPassword, user.userHashedRegPassword)) {
        user = user.toObject();
        delete user.userHashedRegPassword;
        return user;
    } else {
        return null;
    }
}

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

function isUserValid(user, userRegPassword, userHashedRegPassword) {
    return user && bcrypt.compareSync(userRegPassword, userHashedRegPassword);
}

module.exports = {
    insert,
    getUserByEmailIdAndPassword,
    getUserById
};