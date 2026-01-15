const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String,
});

const collaction = mongoose.model("StudentDetails",detailSchema)
module.exports = collaction