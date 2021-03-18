const mongoose = require('mongoose')
const Schema = mongoose.Schema //Schema is a class/Constructor function

// schema is uniquely called
const userSchema = new Schema({
    name: { type: String, required:true},
    email: { type: String, required:true, unique: true},
    password: { type: String, required:true},
    role: {type: String, default: 'customer'}
}, {timestamps: true})

const User = mongoose.model('User', userSchema) // the first word Menu it checks for it, menuschema is the schema will be applied to the model name
                            // THe first argument here is really important

module.exports = User