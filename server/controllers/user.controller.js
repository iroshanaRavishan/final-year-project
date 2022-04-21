const UserRegistration = require('../models/userRegistration.model');
const DesignerRegistration = require('../models/designerRegistration.model');
const HShopRegistration = require('../models/hShopRegistration.model');
const ItemAdding = require('../models/ItemAdding.model');
const bcrypt = require('bcrypt');

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
        //delete designer.designerHashedRegPassword;
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

async function getItemsByDesignerId(id) {
    let designerItems = await ItemAdding.find({id});
    let items = [];
    for (const item of designerItems) {
        items.push(item.toObject());
    }
    //designerItems = designerItems.toObject();
    return items;
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
            //delete designer.designerHashedRegPassword;
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
    getUserByEmailIdAndPasswordUser,
    getUserByEmailIdAndPasswordDesigner,
    getUserByEmailIdAndPasswordHShop,
    getUserById,
    getItemsByDesignerId
};