const express = require('express');
const asyncHandler = require('express-async-handler');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

//localhost:4050/api/auth/register
router.post('/register', asyncHandler(insert), login);
router.post('/login', asyncHandler(getUserByEmailIdAndPassword), login);

async function insert(req, res, next) {
    const user = req.body;
    console.log('registering the user', user);
    req.user = await userController.insert(user);
    next();
}

async function getUserByEmailIdAndPassword(req, res, next) {
    const user = req.body;
    console.log(`Searching user for`, user);

    const savedUser = await userController.getUserByEmailIdAndPassword(user.userLogUsername, user.userLogPassword);
    req.user = savedUser;
    next();
}

function login(req, res) {
    const user = req.user;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    });
}


module.exports = router;