const order = require('../../../models/order')

function orderController(){
    return {
        index(req,res){
            order.find({status: {$ne: 'completed'}},null,{sort:{'createdAt':-1}}).populate('customerId','-password').exec((err,orders)=>{ // password field nahi chahiye. exec is used to run the mongoose code that we have just written
                if(req.xhr){ // if this is a axios call function, then just return the data
                    return res.json(orders)
                }else{
                    res.render('admin/orders')
                }
            }) // ne means an attribute in database. we are trying to show only the active orders on this
        } // Continue, .populate kya karega? populate will get the user from the database. we have customerID with a userId leke we will get the full data of the user using that id. it will fetch it.
    }
}

module.exports = orderController