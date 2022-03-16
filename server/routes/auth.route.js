const express = require('express');
const asyncHandler = require('express-async-handler');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const passport = require('../middleware/passport');
const router = express.Router();
const userStorage = require('../helpers/storage');
const UserRegistration = require('../models/userRegistration.model');
const DesignerRegistration = require('../models/designerRegistration.model');
const HShopRegistration =  require('../models/hShopRegistration.model');
const bcrypt = require('bcrypt');


//localhost:4050/api/auth/registeruser
router.post("/registeruser", userStorage.single('userRegProfilePic'), asyncHandler(insertUser), loginUser);
router.post("/registerdesigner", userStorage.array('designerRegProfilePics', 2), asyncHandler(insertDesigner), loginDesigner);
router.post("/registerhshop", userStorage.array('hShopRegProfilePics', 2), asyncHandler(insertHShop), loginHShop);

router.post("/loginuser", asyncHandler(getUserByEmailIdAndPasswordUser), loginUser);
router.post("/logindesigner", asyncHandler(getUserByEmailIdAndPasswordDesigner), loginDesigner);
router.post("/loginhshop", asyncHandler(getUserByEmailIdAndPasswordHShop), loginHShop);

router.get("/registerdesigner", getDesigners, loginDesigner);
router.get("/registerhshop", getHShops, loginHShop);

router.put("/updatedesigner/:id", asyncHandler(updateDesigner), loginDesigner);
router.put("/updatedesignerprofilepics/:id", userStorage.array('designerRegProfilePics', 2), asyncHandler(updateDesignerProfilePics), loginDesigner);
router.put("/updatedesignerpassword/:id", asyncHandler(getOldUserByEmailIdAndPasswordDesigner), asyncHandler(updateDesignerPassword), loginDesigner);

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
    const Roles = 'user';

    delete userRegPassword;
    
    const user = new UserRegistration({
        userRegUsername,
        userRegEmail,
        userHashedRegPassword,
        userRegProfilePic,
        userRegTelephone,
        userRegAddress,
        userRegDistrict,
        Roles
      });

    console.log('Saving the user to the DB', user);
    req.user = await user.save(); // taking the user from the class to the request
    console.log('posted');
    next();
}

async function insertDesigner(req, res, next) {
    const designerRegUsername = req.body.designerRegUsername;
    const designerRegEmail = req.body.designerRegEmail;
    const designerRegNIC = req.body.designerRegNIC;
    const designerHashedRegPassword = bcrypt.hashSync(req.body.designerRegPassword, 10);
    const designerRegPassword = req.body.designerRegPassword;
    const designerRegProfilePic = 'http://localhost:4050/images/' + req.files[0].filename; // Note: set path dynamically
    const designerRegTelephone = req.body.designerRegTelephone;
    const designerRegAddress = req.body.designerRegAddress;
    const designerRegDistrict = req.body.designerRegDistrict;
    const designerRegShopName = req.body.designerRegShopName;
    const designerRegShopDesc = req.body.designerRegShopDesc;
    const designerRegShopEmail = req.body.designerRegShopEmail;
    const designerRegShopAddress = req.body.designerRegShopAddress;
    const designerRegShopDistrict = req.body.designerRegShopDistrict;
    const designerRegShopPostalCode = req.body.designerRegShopPostalCode;
    const designerRegShopLocation = req.body.designerRegShopLocation;
    const designerRegShopTelephone = req.body.designerRegShopTelephone;
    const designerRegShopPic = 'http://localhost:4050/images/' + req.files[1].filename; // Note: set path dynamically
    const designerRegPricing = req.body.designerRegPricing;
    const Roles = 'vender';

    delete designerRegPassword;
    
    const designer = new DesignerRegistration({
        designerRegUsername,
        designerRegEmail,
        designerRegNIC,
        designerHashedRegPassword,
        designerRegProfilePic,
        designerRegTelephone,
        designerRegAddress,
        designerRegDistrict,
        designerRegShopName,
        designerRegShopDesc,
        designerRegShopEmail,
        designerRegShopAddress,
        designerRegShopDistrict ,
        designerRegShopPostalCode,
        designerRegShopLocation,
        designerRegShopTelephone,
        designerRegShopPic,
        designerRegPricing,
        Roles
    });

    console.log('registering the designer', designer);
    req.designer = await designer.save(); // taking the user from the class to the request
    console.log('posted');
    next();
}

async function insertHShop(req, res, next) {
    const hShopRegUsername = req.body.hShopRegUsername;
    const hShopRegEmail = req.body.hShopRegEmail;
    const hShopRegNIC = req.body.hShopRegNIC;
    const hShopHashedRegPassword = bcrypt.hashSync(req.body.hShopRegPassword, 10);
    const hShopRegPassword = req.body.hShopRegPassword;
    const hShopRegProfilePic = 'http://localhost:4050/images/' + req.files[0].filename; // Note: set path dynamically
    const hShopRegTelephone = req.body.hShopRegTelephone;
    const hShopRegAddress = req.body.hShopRegAddress;
    const hShopRegDistrict = req.body.hShopRegDistrict;
    const hShopRegShopName = req.body.hShopRegShopName;
    const hShopRegShopDesc = req.body.hShopRegShopDesc;
    const hShopRegShopEmail = req.body.hShopRegShopEmail;
    const hShopRegShopAddress = req.body.hShopRegShopAddress;
    const hShopRegShopDistrict = req.body.hShopRegShopDistrict;
    const hShopRegShopPostalCode = req.body.hShopRegShopPostalCode;
    const hShopRegShopLocation = req.body.hShopRegShopLocation;
    const hShopRegShopTelephone = req.body.hShopRegShopTelephone;
    const hShopRegShopPic = 'http://localhost:4050/images/' + req.files[1].filename; // Note: set path dynamically
    const hShopRegPricing = req.body.hShopRegPricing;
    const Roles = 'vender';

    delete hShopRegPassword;
    
    const hShop = new HShopRegistration({
        hShopRegUsername,
        hShopRegEmail,
        hShopRegNIC,
        hShopHashedRegPassword,
        hShopRegProfilePic,
        hShopRegTelephone,
        hShopRegAddress,
        hShopRegDistrict,
        hShopRegShopName,
        hShopRegShopDesc,
        hShopRegShopEmail,
        hShopRegShopAddress,
        hShopRegShopDistrict ,
        hShopRegShopPostalCode,
        hShopRegShopLocation,
        hShopRegShopTelephone,
        hShopRegShopPic,
        hShopRegPricing,
        Roles
    });

    console.log('registering the hShop', hShop);
    req.hShop = await hShop.save(); // taking the user from the class to the request
    console.log('posted');
    next();
}

async function getDesigners(req, res) {
    const designers = await DesignerRegistration.find();
    console.log('found designers');
    res.status(200).json({ designers });
};

async function getHShops(req, res) {
    const hShops = await HShopRegistration.find();
    console.log('found hardware shops');
    res.status(200).json({ hShops });
};

async function updateDesigner(req, res, next) {

    const designer = {
        designerRegUsername: req.body.designerRegUsername,
        designerRegEmail: req.body.designerRegEmail,
        designerRegNIC: req.body.designerRegNIC,
        designerRegTelephone: req.body.designerRegTelephone,
        designerRegAddress: req.body.designerRegAddress,
        designerRegDistrict: req.body.designerRegDistrict,
        designerRegShopName: req.body.designerRegShopName,
        designerRegShopDesc: req.body.designerRegShopDesc,
        designerRegShopEmail: req.body.designerRegShopEmail,
        designerRegShopAddress: req.body.designerRegShopAddress,
        designerRegShopDistrict: req.body.designerRegShopDistrict,
        designerRegShopPostalCode: req.body.designerRegShopPostalCode,
        designerRegShopLocation: req.body.designerRegShopLocation,
        designerRegShopTelephone: req.body.designerRegShopTelephone,
        designerRegPricing: req.body.designerRegPricing,
    };

    req.designer = await DesignerRegistration.findByIdAndUpdate(req.params.id, { $set: designer }, {new: true}).then((err, data) =>{        
        if(!err){
            console.log('updated');
            next();
        }
    });
}

async function updateDesignerProfilePics(req, res, next) {

    const designer = {
        designerRegProfilePic: 'http://localhost:4050/images/' + req.files[0].filename,
        designerRegShopPic: 'http://localhost:4050/images/' + req.files[1].filename
    };
    req.designer = await DesignerRegistration.findByIdAndUpdate(req.params.id, { $set: designer }, {new: true}).then((err, data) =>{        
        if(!err){
            console.log('updated profile pictures');
            next();
        }
    });
}

async function updateDesignerPassword(req, res, next) {
    if(req.designer!==null){
        const designer = {
            designerHashedRegPassword: bcrypt.hashSync(req.body.designerRegNewPassword, 10),
        };
        req.designer = await DesignerRegistration.findByIdAndUpdate(req.params.id, { $set: designer }, {new: true}).then((err, data) =>{        
            if(!err){
                console.log('updated password');
                next();
            }
        });
    } else {
        console.log('The Old Password is Wrong')
    }
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

async function getOldUserByEmailIdAndPasswordDesigner(req, res, next) {
    const designer = req.body;
    console.log(`Searching user for`, designer);

    // taking the user's username and password from the class to the request
    const savedDesigner = await userController.getUserByEmailIdAndPasswordDesigner(designer.designerRegEmail, designer.designerRegOldPassword); 
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