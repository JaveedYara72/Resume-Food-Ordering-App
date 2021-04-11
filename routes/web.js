const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const admin = require('../app/http/middlewares/admin')
const statusController = require('../app/http/controllers/admin/statusController')


function initRoutes(app){ // the parameter is in the function is automatically received
    // homeController().index

    app.get('/', homeController().index) //this will only replace the res,req

    // app.get('/',(req,res)=>{
    //     // res.send("Hello from server") -> this will be used when there is no rendering involved
    //     res.render('home')
    // })
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister) // 2 functions cannot have the same function name
    app.post('/logout',authController().logout)

    app.get('/cart',cartController().index)
    app.post('/update-cart', cartController().update)
    
    // Customer routes
    app.post('/orders', orderController().store)
    app.get('/customer/orders',auth,orderController().index) // auth is a middleware which protects the logged in users only, if you logout, customers/orders will not be valid anymore. Nice way to protect us. just add a middleware to protect
    app.get('/customer/orders/:id',auth,orderController().show)

    //Admin routes
    app.get('/admin/orders', admin, AdminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)

    
}

module.exports = initRoutes
