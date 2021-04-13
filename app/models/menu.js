// this is a model to fetch data
// model hota hai singular, tables ke andar menus plural hona chahiye

const mongoose = require('mongoose')
const Schema = mongoose.Schema //Schema is a class/Constructor function

// schema is uniquely called
const menuSchema = new Schema({
    name: { type: String, required:true},
    image: { type: String, required:true},
    price: { type: Number, required:true},
    size: { type: String, required:true}
})

const Menu = mongoose.model('Menu', menuSchema) // the first word Menu it checks for it, menuschema is the schema will be applied to the model name
                            // THe first argument here is really important

module.exports = Menu
