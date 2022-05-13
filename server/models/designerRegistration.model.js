const mongoose = require('mongoose');

// schema for users
const DesignerSchema = new mongoose.Schema({
    designerRegUsername : {type : String, required: true},
    designerRegEmail : {type : String, required: true, match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email'
        ]
    },
    designerRegNIC : {type : String, required: true},
    designerHashedRegPassword : {type : String, required: true},
    createdAt : {type : Date, default: Date.now},
    Roles : [{type : String}],
    profilePic: {type: String},
    designerRegTelephone : {type : String, required: true},
    designerRegAddress : {type : String, required: true},
    designerRegDistrict : {type : String},
    designerRegShopName : {type : String, required: true},
    designerRegShopDesc : {type : String, required: true},
    designerRegShopEmail : {type : String, required: true},
    designerRegShopAddress : {type : String, required: true},
    designerRegShopDistrict : {type : String},
    designerRegShopPostalCode : {type : String, required: true},
    designerRegShopLocation : {type : String, required: true},
    designerRegShopTelephone : {type : String, required: true},
    designerRegShopPic:  {type : String},
    designerRegPricing : {type : String, required: true}
    

});

module.exports = mongoose.model('DesignerRegistration', DesignerSchema);