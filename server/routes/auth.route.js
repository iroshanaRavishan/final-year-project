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
const ItemAdding = require('../models/ItemAdding.model');
const ItemAddingHShop = require ('../models/ItemAddingHShop.model');
const AllSells = require('../models/allSells.model');
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

router.get("/addinganitemhshop", getHShopItems, loginHShop);

router.put("/updatedesigner/:id", asyncHandler(updateDesigner), loginDesigner);
router.post("/addinganitem", userStorage.array('imagesOfDesign', 2), asyncHandler(insertAnItem), addedItem);
router.put("/updatedesigneruserprofilepics/:id", userStorage.array('designerUserProfilePic', 2), asyncHandler(updateDesignerUserProfilePics), loginDesigner);
router.put("/updatedesignershopprofilepics/:id", userStorage.array('designerShopProfilePic', 2), asyncHandler(updateDesignerShopProfilePics), loginDesigner);
router.put("/updatedesignerpassword/:id", asyncHandler(getOldUserByEmailIdAndPasswordDesigner), asyncHandler(updateDesignerPassword), loginDesigner);

router.put("/updatehshop/:id", asyncHandler(updateHShop), loginHShop);
router.post("/addinganitemhshop", userStorage.array('imagesOfDesign', 2), asyncHandler(insertAnItemHShop), addedItem);
router.put("/updatehshopuserprofilepics/:id", userStorage.array('hShopUserProfilePic', 2), asyncHandler(updateHShopUserProfilePics), loginHShop);
router.put("/updatehshopshopprofilepics/:id", userStorage.array('hShopShopProfilePic', 2), asyncHandler(updateHShopShopProfilePics), loginHShop);
router.put("/updatehshoppassword/:id", asyncHandler(getOldUserByEmailIdAndPasswordHShop), asyncHandler(updateHShopPassword), loginHShop);

router.post("/loadingdesigneritems/:id", asyncHandler(getItemsByDesignerId), designerItems);
router.post("/loadinghshopitems/:id", asyncHandler(getItemsByHShopId), hSHopItems);

router.post("/confirmedorderdetails", asyncHandler(orderConfirming), addedOrder);

router.post("/validatinguser", asyncHandler(getUserByEmailIdAndPasswordUser), loginUser);

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
    const Roles = 'designer';

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
    const Roles = 'hshop';

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

async function getHShopItems(req, res) {
    const hShopItem = await ItemAddingHShop.find();
    console.log('found hardware shop Items');
    res.status(200).json({ hShopItem });
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
        designerRegShopTelephone: req.body.designerRegShopTelephone
    };

    req.designer = await DesignerRegistration.findByIdAndUpdate(req.params.id, { $set: designer }, {new: true}).then((err, data) =>{        
        if(!err){
            console.log('updated');
            next();
        }
    });
}

async function updateDesignerUserProfilePics(req, res, next) {
    const designer = {
        designerRegProfilePic: 'http://localhost:4050/images/' + req.files[0].filename
    };
    req.designer = await DesignerRegistration.findByIdAndUpdate(req.params.id, { $set: designer }, {new: true}).then((err, data) =>{        
        if(!err){
            console.log('updated profile pictures');
            next();
        }
    });
}

async function updateDesignerShopProfilePics(req, res, next) {
    const designer = {
        designerRegShopPic: 'http://localhost:4050/images/' + req.files[0].filename
    };
    req.designer = await DesignerRegistration.findByIdAndUpdate(req.params.id, { $set: designer }, {new: true}).then((err, data) =>{        
        if(!err){
            console.log('updated profile pictures');
            next();
        }
    });
}

async function updateHShopUserProfilePics(req, res, next) {
    const hShop = {
        hShopRegProfilePic: 'http://localhost:4050/images/' + req.files[0].filename
    };
    req.hShop = await HShopRegistration.findByIdAndUpdate(req.params.id, { $set: hShop }, {new: true}).then((err, data) =>{        
        if(!err){
            console.log('updated profile pictures');
            next();
        }
    });
}

async function updateHShopShopProfilePics(req, res, next) {
    const hShop = {
        hShopRegShopPic: 'http://localhost:4050/images/' + req.files[0].filename
    };
    req.hShop = await HShopRegistration.findByIdAndUpdate(req.params.id, { $set: hShop }, {new: true}).then((err, data) =>{        
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

async function updateHShopPassword(req, res, next) {
    if(req.hShop!==null){
        const hShop = {
            hShopHashedRegPassword: bcrypt.hashSync(req.body.hShopNewPassword, 10),
        };
        req.hShop = await HShopRegistration.findByIdAndUpdate(req.params.id, { $set: hShop }, {new: true}).then((err, data) =>{        
            if(!err){
                console.log('updated password');
                next();
            }
        });
    } else {
        console.log('The Old Password is Wrong')
    }
}

async function insertAnItem(req, res, next) {
    const designerSystemId = req.body.designerSystemId;
    const designerEmail = req.body.designerEmail;
    const designerShopName = req.body.designerShopName;
    const designerShopEmail = req.body.designerShopEmail;
    const category = req.body.category;
    const name = req.body.name;
    const description = req.body.description;
    const area = req.body.area;
    const noOfFloors = req.body.noOfFloors;
    const estCost = req.body.estCost;
    const isDiscount =  req.body.isDiscount;
    const discount = req.body.discount;
    const isGarage = req.body.isGarage;
    const isBalcony = req.body.isBalcony;
    const isVarenda = req.body.isVarenda;
    const noOfBedRooms = req.body.noOfBedRooms;
    const noOfBathRooms = req.body.noOfBathRooms;
    const isBathRoomAttached = req.body.isBathRoomAttached;
    const images = 'http://localhost:4050/images/' + req.files[0].filename; // Note: set path dynamically
    
    const item = new ItemAdding({
        designerSystemId,
        designerEmail,
        designerShopName,
        designerShopEmail,
        category,
        name,
        description,
        area,
        noOfFloors,
        estCost,
        isDiscount,
        discount,
        isGarage,
        isBalcony ,
        isVarenda,
        noOfBedRooms,
        noOfBathRooms,
        isBathRoomAttached,
        images,
       // designImagesT
    });

    console.log('adding an item', item);
    req.item = await item.save(); // taking the user from the class to the request
    console.log('added the item');
    next();
}

async function updateHShop(req, res, next) {
    const hShop = {
        hShopRegUsername: req.body.hShopRegUsername,
        hShopRegEmail: req.body.hShopRegEmail,
        hShopRegNIC: req.body.hShopRegNIC,
        hShopRegTelephone: req.body.hShopRegTelephone,
        hShopRegAddress: req.body.hShopRegAddress,
        hShopRegDistrict: req.body.hShopRegDistrict,
        hShopRegShopName: req.body.hShopRegShopName,
        hShopRegShopDesc: req.body.hShopRegShopDesc,
        hShopRegShopEmail: req.body.hShopRegShopEmail,
        hShopRegShopAddress: req.body.hShopRegShopAddress,
        hShopRegShopDistrict: req.body.hShopRegShopDistrict,
        hShopRegShopPostalCode: req.body.hShopRegShopPostalCode,
        hShopRegShopLocation: req.body.hShopRegShopLocation,
        hShopRegShopTelephone: req.body.hShopRegShopTelephone
    };

    req.hShop = await HShopRegistration.findByIdAndUpdate(req.params.id, { $set: hShop }, {new: true}).then((err, data) =>{        
        if(!err){
            console.log('updated');
            next();
        }
    });
}

async function insertAnItemHShop(req, res, next) {
    const hShopSystemId = req.body.hShopSystemId;
    const hShopEmail = req.body.hShopEmail;
    const hShopShopName = req.body.hShopShopName;
    const hShopShopEmail = req.body.hShopShopEmail;
    const category = req.body.category;
    const name = req.body.name;
    const description = req.body.description;
    const subCategory = req.body.subCategory;
    const price = req.body.price;
    const isDiscount = req.body.isDiscount;
    const discount = req.body.discount;
    const priceWithUnit = req.body.priceWithUnit;
    const isQCPass = req.body.isQCPass;
    const images = 'http://localhost:4050/images/' + req.files[0].filename; // Note: set path dynamically
    
    const item = new ItemAddingHShop({
        hShopSystemId,
        hShopEmail,
        hShopShopName,
        hShopShopEmail,
        category,
        name,
        description,
        subCategory,
        price,
        isDiscount,
        discount,
        priceWithUnit,
        isQCPass,
        images,
       // designImagesT
    });

    console.log('adding an item', item);
    req.item = await item.save(); // taking the user from the class to the request
    console.log('added the item');
    next();
}

async function orderConfirming(req, res, next) {

    const fullName = req.body.fullName;
    const useremail = req.body.useremail;
    const telephone = req.body.telephone;
    const address = req.body.address;
    const district = req.body.district;
    const zipcode = req.body.zipcode;
    const collectAt = req.body.collectAt;
    const payementType = req.body.payementType;
    const venderType = req.body.venderType;
    const sts = req.body.status;
    const itemId = req.body.itemId;
    
    const order = new AllSells({
        fullName,
        useremail,
        telephone,
        address,
        district,
        zipcode,
        collectAt,
        payementType,
        venderType,
        sts,
        itemId
    });

    console.log('adding an order', order);
    req.order = await order.save(); // taking the user from the class to the request
    console.log('added the order');
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

async function getOldUserByEmailIdAndPasswordHShop(req, res, next) {
    const hShop = req.body;
    console.log(`Searching user for`, hShop);

    // taking the user's username and password from the class to the request
    const savedHShop = await userController.getUserByEmailIdAndPasswordHShop(hShop.hShopRegEmail, hShop.hShopOldPassword); 
    req.hShop = savedHShop;
    next(); //calling to the nest pipeline of the middleware
}

async function getItemsByDesignerId(req, res, next) { 
    const savedDesignerItems = await userController.getItemsByDesignerId(req.params.id); 
    req.designerItems = savedDesignerItems;
    next(); //calling to the nest pipeline of the middleware
}

async function getItemsByHShopId(req, res, next) { 
    const savedHShopItems = await userController.getItemsByHShopId(req.params.id); 
    req.hShopItems = savedHShopItems;
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

function addedItem(req, res) { 
    const item = req.item; 
    // sending the user and token in the response
    res.json({ 
        item     
    });
}

function addedOrder(req, res) { 
    const order = req.order; 
    // sending the user and token in the response
    res.json({ 
        order     
    });
}

function designerItems(req, res) { 
    const designerItems = req.designerItems;
    // sending the user and token in the response
    res.json({ 
        designerItems
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

function hSHopItems(req, res) { 
    const hShopItems = req.hShopItems;
    // sending the user and token in the response
    res.json({ 
        hShopItems
    });
}

module.exports = router;