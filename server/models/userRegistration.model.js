const mongoose = require('mongoose');

// schema for users
const UserSchema = new mongoose.Schema({
    userRegUsername : {type : String, required: true},
    userRegEmail : {type : String, required: true, unique: true, match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email'
        ]
    },
    userHashedRegPassword : {type : String, required: true},
    createdAt : {type : Date, default: Date.now},
    Roles : [{type : String}],
    userRegProfilePic: {type: String, required: true},
    userRegTelephone : {type : String, required: true},
    userRegAddress : {type : String, required: true},
    userRegDistrict : {type : String}
});

module.exports = mongoose.model('UserRegistration', UserSchema);