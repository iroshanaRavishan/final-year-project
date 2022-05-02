const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    fullName: {type: String},
    useremail : {type: String},
    telephone: {type: String},
    address: {type: String},
    district: {type: String},
    zipcode: {type: String},
    collectAt: {type: String},
    payementType: {type: String},
    venderType: {type: String},
    sts: {type: String},
    itemId: {type: String},

});

module.exports = mongoose.model('AllSells', OrderSchema);
