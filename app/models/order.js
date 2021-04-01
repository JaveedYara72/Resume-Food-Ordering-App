const mongoose = require('mongoose')
const Schema = mongoose.Schema //Schema is a class/Constructor function

// schema is uniquely called
const orderSchema = new Schema({
    customerId: {
         type: mongoose.Schema.Types.ObjectId, // we need userid of the customer who placed the order, this will connect user table to this
        ref:'User',
        required: true 
    },
    items: {
        type: Object, // this object will be taken from the cart
        required: true
    },
    phone:{
        type:String, required: true
    },
    address:{
        type:String, required: true
    },
    paymentType:{
        type:String, default: 'COD'
    },
    status:{
        type: String, default: 'Order_Placed'
    },
    
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema) // the first word Menu it checks for it, menuschema is the schema will be applied to the model name
                            // THe first argument here is really important

module.exports = Order