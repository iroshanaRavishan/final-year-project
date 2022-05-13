const mongoose = require('mongoose');

const SummerySchema = new mongoose.Schema({
    shopId: {type: String},
    no : {type: String},
    earnings: {type: String},
    previouseD: {type: String},
    createdAt : {type : Date, default: Date.now},
});

module.exports = mongoose.model('AllSummery', SummerySchema);
