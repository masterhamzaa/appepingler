const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fullName: { required: true, type: String },
    email: { required: true, unique: true, type: String },
    password: { required: true, type: String },
}, { 'collection': 'users' })

module.exports = mongoose.model('user', UserSchema)