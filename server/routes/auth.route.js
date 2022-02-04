const express = require('express');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const userController = require('../controllers/user.controller');

const router = express.Router();

//localhost:4050/api/auth/register
router.post('/register', asyncHandler(insert));
router.post('/login', asyncHandler(grtUserByEmailIdAndPassword));

async function insert(req, res, docs,next) {
    const user = req.body;
    console.log('registering the user', user);
    const savedUser = await userController.insert(user);
    res.json(savedUser);
}

async function grtUserByEmailIdAndPassword(req, res, next) {
    const user = req.body;
    console.log(`Searching user for`, user);

    const savedUser = await userController.grtUserByEmailIdAndPassword(user.userLogUsername, user.userLogPassword);
    res.json(savedUser);
}

module.exports = router;