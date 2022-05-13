const mongoose = require('mongoose');

// schema for shops
const HShopsSchema = new mongoose.Schema({
    hShopRegUsername : {type : String, required: true},
    hShopRegEmail : {type : String, required: true, unique: true, match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email'
        ]
    },
    hShopRegNIC : {type : String, required: true, unique: true},
    hShopHashedRegPassword : {type : String, required: true},
    createdAt : {type : Date, default: Date.now},
    Roles : [{type : String}],
    profilePic: {type: String},
    hShopRegTelephone : {type : String, required: true},
    hShopRegAddress : {type : String, required: true},
    hShopRegDistrict : {type : String},
    hShopRegShopName : {type : String, required: true},
    hShopRegShopDesc : {type : String, required: true},
    hShopRegShopEmail : {type : String, required: true},
    hShopRegShopAddress : {type : String, required: true},
    hShopRegShopDistrict : {type : String},
    hShopRegShopPostalCode : {type : String, required: true},
    hShopRegShopLocation : {type : String, required: true},
    hShopRegShopTelephone : {type : String, required: true},
    hShopRegShopPic:  {type : String, required: true},
    hShopRegPricing : {type : String, required: true}
    

});

module.exports = mongoose.model('HShopRegistration', HShopsSchema);