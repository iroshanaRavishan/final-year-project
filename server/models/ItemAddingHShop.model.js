const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    hShopSystemId: {type: String},
    hShopEmail: {type: String,},
    hShopShopName: {type: String},
    hShopShopEmail: {type: String},
    category: {type: String},    
    name: {type: String},
    description: {type: String},
    availability: {type: String},
    subCategory: {type: String},
    price: {type: String},
    isDiscount: {type: String},
    discount: {type: String},
    priceWithUnit: {type: String},
    isQCPass: {type: String},
    images: {type: String},
   // designImagesT: {type: String}
});

module.exports = mongoose.model('ItemAddingHShop', ItemSchema);
