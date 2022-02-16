const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * function of generating token
 * @param {*} user 
 * @returns 
 */
function generateToken(user) {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
}

module.exports = { generateToken };