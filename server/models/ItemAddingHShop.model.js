const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    hShopSystemId: {type: String},
    hShopEmail: {type: String,},
    hShopShopName: {type: String},
    hShopShopEmail: {type: String},
    itemCategory: {type: String},
    itemName: {type: String},
    itemDescription: {type: String},
    itemPrice: {type: String},
    itemIsQCPass: {type: String},
    itemImages: {type: String},
   // designImagesT: {type: String}
});

module.exports = mongoose.model('ItemAddingHShop', ItemSchema);
