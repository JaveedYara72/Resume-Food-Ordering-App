// Login, Registration wala part yaha ayega

function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },

        register(req,res){
            res.render('auth/register')
        },

        cart(req,res){
            res.render('customers/cart')
        }
    }
}

module.exports = authController