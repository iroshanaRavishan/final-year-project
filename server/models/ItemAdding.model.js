const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    designerSystemId: {type: String},
    designerEmail: {type: String,},
    designerShopName: {type: String},
    designerShopEmail: {type: String},
    designCategory: {type: String},
    designName: {type: String},
    designDescription: {type: String},
    designArea: {type: String},
    designNoOfFloors: {type: String},
    designEstCost: {type: String},
    designIsGarage: {type: String},
    designIsBalcony: {type: String},
    designIsVarenda: {type: String},
    designNoOfBathRooms: {type: String},
    designIsBathRoomAttached: {type: String},
    designImages: {type: String},
   // designImagesT: {type: String}
});

module.exports = mongoose.model('ItemAdding', ItemSchema);