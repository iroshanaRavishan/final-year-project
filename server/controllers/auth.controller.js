const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * function of generating token
 * @param {*} user 
 * @returns 
 */
function generateTokenUser(user) {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
}

function generateTokenDesigner(designer) {
    const payload = JSON.stringify(designer);
    return jwt.sign(payload, config.jwtSecret);
}

function generateTokenHShop(hShop) {
    const payload = JSON.stringify(hShop);
    return jwt.sign(payload, config.jwtSecret);
}

module.exports = { 
    generateTokenUser,
    generateTokenDesigner,
    generateTokenHShop
};