const Order = require('../../../models/order')

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
                req.flash('success','Order is placed successfully')
                return res.redirect('/')
            }) //yaha pe result milega, which is the object we have just made now
            .catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/cart')
            })
        },
async index(req,res){
            const orders = await Order.find({ customerId: req.user._id  }) // we have customer id and user id in every order
            // req.user._id this will give us the logged in user ka pura orders. all of this is related to
             // orders jitne bhi hai, its in array
             res.render('customers/orders',{
                 orders: orders
             })
        }
    }
}

module.exports = orderController