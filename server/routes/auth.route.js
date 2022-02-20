const express = require('express');
const asyncHandler = require('express-async-handler');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const passport = require('../middleware/passport');
const router = express.Router();

//localhost:4050/api/auth/register
router.post("/register", asyncHandler(insert), login);
router.post("/login", asyncHandler(getUserByEmailIdAndPassword), login);
router.get("/findme", passport.authenticate("jwt", { session: false}), login);

/**
 * function of user inserting
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function insert(req, res, next) {
    const user = req.body;
    console.log('registering the user', user);
    req.user = await userController.insert(user); // taking the user from the class to the request
    next();
}

/**
 * getting the user by emailId and password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getUserByEmailIdAndPassword(req, res, next) {
    const user = req.body;
    console.log(`Searching user for`, user);

    // taking the user's username and password from the class to the request
    const savedUser = await userController.getUserByEmailIdAndPassword(user.userLogEmail, user.userLogPassword); 
    req.user = savedUser;
    next(); //calling to the nest pipeline of the middleware
}

/**
 * third pipeling
 * @param {*} req 
 * @param {*} res 
 */
function login(req, res) { 
    const user = req.user;
    const token = authController.generateToken(user);
    // sending the user and token in the response
    res.json({ 
        user,
        token
    });
}

module.exports = router;