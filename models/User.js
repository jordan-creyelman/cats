// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    password: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);