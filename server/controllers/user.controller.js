const UserRegistration = require('../models/userRegistration.model');
const DesignerRegistration = require('../models/designerRegistration.model');
const HShopRegistration = require('../models/hShopRegistration.model')
const bcrypt = require('bcrypt');

/**
 * user inserting function
 * @param {*} user 
 * @returns 
 */
// async function insertUser(user) {
//     user.userHashedRegPassword = bcrypt.hashSync(user.userRegPassword, 10);
//     delete user.userRegPassword;

//     //make a DB call to save the users in the DB
//     console.log('Saving the user to the DB', user);
//     return await new UserRegistration(user).save()
// }

async function insertDesigner(designer) {
    designer.designerHashedRegPassword = bcrypt.hashSync(designer.designerRegPassword, 10);
    delete designer.designerRegPassword;

    //make a DB call to save the users in the DB
    console.log('Saving the designer to the DB', designer);
    return await new DesignerRegistration(designer).save();
}

async function insertHShop(hShop) {
    hShop.hShopHashedRegPassword = bcrypt.hashSync(hShop.hShopRegPassword, 10);
    delete hShop.hShopRegPassword;

    //make a DB call to save the users in the DB
    console.log('Saving the designer to the DB', hShop);
    return await new HShopRegistration(hShop).save();
}

/**
 * getting the user by emailId and password
 * @param {*} userRegUsername 
 * @param {*} userRegPassword 
 * @returns 
 */
async function getUserByEmailIdAndPasswordUser(userRegEmail, userRegPassword) {
    let user = await UserRegistration.findOne({userRegEmail});

    if(isUserValidUser(user, userRegPassword, user.userHashedRegPassword)) {
        user = user.toObject();
        delete user.userHashedRegPassword;
        return user;
    } else {
        return null;
    }
}

async function getUserByEmailIdAndPasswordDesigner(designerRegEmail, designerRegPassword) {
    let designer = await DesignerRegistration.findOne({designerRegEmail});

    if(isUserValidDesigner(designer, designerRegPassword, designer.designerHashedRegPassword)) {
        designer = designer.toObject();
        delete designer.designerHashedRegPassword;
        return designer;
    } else {
        return null;
    }
}

async function getUserByEmailIdAndPasswordHShop(hShopRegEmail, hShopRegPassword) {
    let hShop = await HShopRegistration.findOne({hShopRegEmail});

    if(isUserValidHShop(hShop, hShopRegPassword, hShop.hShopHashedRegPassword)) {
        hShop = hShop.toObject();
        delete hShop.hShopHashedRegPassword;
        return hShop;
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
    let designer = await DesignerRegistration.findById(id);
    let hShop = await HShopRegistration.findById(id);

    if(user || designer || hShop){
        if(user) {
            user = user.toObject();
            delete user.userHashedRegPassword;
            return user;
        }
        else if(designer) {
            designer = designer.toObject();
            delete designer.designerHashedRegPassword;
            return designer;
        }
        else if(hShop){
            hShop = hShop.toObject();
            delete hShop.hShopHashedRegPassword;
            return hShop;
        }
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
function isUserValidUser(user, userRegPassword, userHashedRegPassword) {
    return user && bcrypt.compareSync(userRegPassword, userHashedRegPassword);
}

function isUserValidDesigner(designer, designerRegPassword, designerHashedRegPassword) {
    return designer && bcrypt.compareSync(designerRegPassword, designerHashedRegPassword);
}

function isUserValidHShop(hShop, hShopRegPassword, hShopHashedRegPassword) {
    return hShop && bcrypt.compareSync(hShopRegPassword, hShopHashedRegPassword);
}

module.exports = {
    // insertUser,
    insertDesigner,
    insertHShop,
    getUserByEmailIdAndPasswordUser,
    getUserByEmailIdAndPasswordDesigner,
    getUserByEmailIdAndPasswordHShop,
    getUserById
};