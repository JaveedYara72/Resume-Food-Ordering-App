const Order = require('../../../models/order')
const moment  = require('moment')

function orderController(){
    return { // we are returning an object
        store(req,res){
            // console.log(req.body) // agar response return nahi karoge to woh ghumte rahega

            //valdiate the request
            const{phone, address} = req.body
            if(!phone || !address){
                req.flash('error', 'All fields must be filled')
                return res.redirect('/cart')
            }
            // agar phone aur address hai
            const order = new Order({
                customerId: req.user._id, // passport kya karta hai, user ko available kardeta hai on the request, by deserializing
                items: req.session.cart.items, // items was an object we made in cart object
                phone,
                address
            })

            order.save().then(result =>{
                Order.populate(result,{ path:'customerId' },(err,placedOrder)=>{
                    req.flash('success','Order is placed successfully')
                delete req.session.cart
                // Emit the event here
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderPlaced', placedOrder)
                return res.redirect('/customer/orders')
                })
                
            }) //yaha pe result milega, which is the object we have just made now
            .catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req,res){
            const orders = await Order.find({ customerId: req.user._id },
                null,
                {sort:{'createdAt': -1}}) // we have customer id and user id in every order, sort context sorts the timeout
            // req.user._id this will give us the logged in user ka pura orders. all of this is related to
            // orders jitne bhi hai, its in array

            res.header('Cache-Control', 'no-store') // i have no idea why
            res.render('customers/orders',{
                orders: orders, moment: moment // sending these variables to the frontend
            })
        },
        async show(req,res){
            const order = await Order.findById(req.params.id) // this id should be named as the same as we named in the controller
            // param because of, param is in the website url

            // Authorize user. authorize karo whether the order is the current logged one or not
            if(req.user._id.toString() === order.customerId.toString()){
                // because both of them are objects above
                return res.render('customers/singleOrder',{order: order})
            }else{
                return res.redirect('/')
            }
        }
    }
}

module.exports = orderController