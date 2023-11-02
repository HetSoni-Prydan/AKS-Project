const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const UserRegister = new Schema({

    profile: {
        type: String,
        default: ""
    },

    firstName: {
        type: String,
        default: ""
    },

    lastName: {
        type: String,
        default: ""
    },

    email:{
        type: String,
        default: ""
    },

    password: {
        type: String,
        default: ""
    },

    mobile:{
        type: Number,
        default: ""
    }


}, {timestamps: true});


const User = mongoose.model("User", UserRegister);
module.exports = {User};

