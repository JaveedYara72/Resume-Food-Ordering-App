const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
function initRoutes(app){ // the parameter is in the function is automatically received
    // homeController().index

    app.get('/', homeController().index) //this will only replace the res,req

    // app.get('/',(req,res)=>{
    //     // res.send("Hello from server") -> this will be used when there is no rendering involved
    //     res.render('home')
    // })
    app.get('/login',authController().login)
    app.get('/register',authController().register)

    app.get('/cart',cartController().index)
    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes
