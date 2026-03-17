const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    resetToken: String,
    resetTokenExpire: Date
});

const admin = mongoose.model("admin",adminSchema)
module.exports = admin;