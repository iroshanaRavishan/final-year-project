const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    designerSystemId: {type: String},
    designerEmail: {type: String,},
    designerShopName: {type: String},
    designerShopEmail: {type: String},
    category: {type: String},
    name: {type: String},
    description: {type: String},
    area: {type: String},
    noOfFloors: {type: String},
    estCost: {type: String},
    isDiscount: {type: String},
    discount: {type: String},
    isGarage: {type: String},
    isBalcony: {type: String},
    isVarenda: {type: String},
    noOfBedRooms: {type: String},
    noOfBathRooms: {type: String},
    isBathRoomAttached: {type: String},
    images: {type: String},
   // imagesT: {type: String}
});

module.exports = mongoose.model('ItemAdding', ItemSchema);