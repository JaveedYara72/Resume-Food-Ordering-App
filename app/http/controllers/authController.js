// Login, Registration wala part yaha ayega

function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },

        register(req,res){
            res.render('auth/register')
        },

        postRegister(req,res){
            const { name, email, password } = req.body // body object se hum variables ko lene vale hai
            // this is also called object destructuring
            console.log(req.body)
        },
    }
}

module.exports = authController