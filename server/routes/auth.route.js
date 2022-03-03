const express = require('express');
const asyncHandler = require('express-async-handler');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const passport = require('../middleware/passport');
const router = express.Router();
const storage = require('../helpers/storage');
const UserRegistration = require('../models/userRegistration.model');
const bcrypt = require('bcrypt');


//localhost:4050/api/auth/registeruser
router.post("/registeruser", storage, asyncHandler(insertUser), loginUser);
router.post("/registerdesigner", asyncHandler(insertDesigner), loginDesigner);
router.post("/registerhshop", asyncHandler(insertHShop), loginHShop);

router.post("/loginuser", asyncHandler(getUserByEmailIdAndPasswordUser), loginUser);
router.post("/logindesigner", asyncHandler(getUserByEmailIdAndPasswordDesigner), loginDesigner);
router.post("/loginhshop", asyncHandler(getUserByEmailIdAndPasswordHShop), loginHShop);

router.get("/findme", passport.authenticate("jwt", { session: false}), loginUser);
/**
 * function of user inserting
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function insertUser(req, res, next) {
    const userRegUsername = req.body.userRegUsername;
    const userRegEmail = req.body.userRegEmail;
    const userHashedRegPassword = bcrypt.hashSync(req.body.userRegPassword, 10);
    const userRegPassword = req.body.userRegPassword;
    const userRegProfilePic = 'http://localhost:4050/images/' + req.file.filename; // Note: set path dynamically
    const userRegTelephone = req.body.userRegTelephone;
    const userRegAddress = req.body.userRegAddress;
    const userRegDistrict = req.body.userRegDistrict;
    delete userRegPassword;
    
    const user = new UserRegistration({
        userRegUsername,
        userRegEmail,
        userHashedRegPassword,
        userRegProfilePic,
        userRegTelephone,
        userRegAddress,
        userRegDistrict,
      });

    console.log('Saving the user to the DB', user);
    req.user = await user.save(); // taking the user from the class to the request
    console.log('posted');
    next();
}

async function insertDesigner(req, res, next) {
    const designer = req.body;
    console.log('registering the designer', designer);
    req.designer = await userController.insertDesigner(designer); // taking the user from the class to the request
    next();
}

async function insertHShop(req, res, next) {
    const hShop = req.body;
    console.log('registering the hShop', hShop);
    req.hShop = await userController.insertHShop(hShop); // taking the user from the class to the request
    next();
}

/**
 * getting the user by emailId and password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getUserByEmailIdAndPasswordUser(req, res, next) {
    const user = req.body;
    console.log(`Searching user for`, user);

    // taking the user's username and password from the class to the request
    const savedUser = await userController.getUserByEmailIdAndPasswordUser(user.userLogEmail, user.userLogPassword); 
    req.user = savedUser;
    next(); //calling to the nest pipeline of the middleware
}

async function getUserByEmailIdAndPasswordDesigner(req, res, next) {
    const designer = req.body;
    console.log(`Searching user for`, designer);

    // taking the user's username and password from the class to the request
    const savedDesigner = await userController.getUserByEmailIdAndPasswordDesigner(designer.designerLogEmail, designer.designerLogPassword); 
    req.designer = savedDesigner;
    next(); //calling to the nest pipeline of the middleware
}

async function getUserByEmailIdAndPasswordHShop(req, res, next) {
    const hShop = req.body;
    console.log(`Searching user for`, hShop);

    // taking the user's username and password from the class to the request
    const savedHShop = await userController.getUserByEmailIdAndPasswordHShop(hShop.hShopLogEmail, hShop.hShopLogPassword); 
    req.hShop = savedHShop;
    next(); //calling to the nest pipeline of the middleware
}

/**
 * third pipeling
 * @param {*} req 
 * @param {*} res 
 */
function loginUser(req, res) { 
    const user = req.user;
    const token = authController.generateTokenUser(user);
    // sending the user and token in the response
    res.json({ 
        user,
        token
    });
}

function loginDesigner(req, res) { 
    const designer = req.designer;
    const token = authController.generateTokenDesigner(designer);
    // sending the user and token in the response
    res.json({ 
        designer,
        token
    });
}

function loginHShop(req, res) { 
    const hShop = req.hShop;
    const token = authController.generateTokenHShop(hShop);
    // sending the user and token in the response
    res.json({ 
        hShop,
        token
    });
}

module.exports = router;