const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    phone:{
        type: String,
        required:true,
    }, 
    profession:{
        type: String,
        required:true,
    },
    password:{
        type: String
    }
})

const userDb = mongoose.model('user', schema);

module.exports = userDb;