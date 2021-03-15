function cartController(){
    return{
        index(req,res){
            // frontend pe session is already available
            
            res.render('customers/cart')
        },
        update(req,res){
            // let cart = {
            //     items: {
            //         pizzaId: {item: pizzaObject, qty: 0},
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            // check if empty cart exists, if not, create one
            if(!req.session.cart){ //session ke andar cart bolke ek key hoga wo store karenge
                req.session.cart = {
                    items: {

                    },
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart // agar kuch tha already, toh ye cart variable mein daaldega.

            
            //check if item does not exist in cart
            if(!cart.items[req.body._id]){ // req.body._id we are checking if this exists or not. _id is the one we send from the click event, and _id is the one with the name also in the database
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }   ,
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price 
            }else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty +  1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            return res.json({
                totalQty: req.session.cart.totalQty
            })
        }
    }
}

module.exports = cartController