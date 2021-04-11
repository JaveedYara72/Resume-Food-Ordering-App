const Order = require('../../../models/order')

function statusController(){
    return{
        update(req,res){
            // order table ke andar jaao, fetch the order first, toh import the model here.
            Order.updateOne({_id: req.body.orderId},{status: req.body.status},(err, data)=>{
                if(err){
                    return res.redirect('/admin/orders');
                }else{
                    return res.redirect('/admin/orders')
                }
            })//because hum sirf ek object ko update kar rahe hai. data is something we get from the dtabase
            // orderId is the name of a orm in the order.ejs. not a database thing. it is something that is being sent to server by the form
            // this will also change the status of the order.

        }
    }
}

module.exports = statusController