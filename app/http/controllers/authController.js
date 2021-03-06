// Login, Registration wala part yaha ayega
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){
    const _getRedirectUrl = (req) =>{
        return req.user.role === 'Admin' ? 'admin/orders' : '/customer/orders'
    }
    return{
        login(req,res){
            res.render('auth/login')
        },

        postLogin(req,res,next){
            
            //validate request
            const {email, password} = req.body
            if(!email || !password){
                req.flash('error', 'All fields are required')  //flash has 2 argument fields, the first one is which type we want to send and it is also the key, the other is the message
                return res.redirect('/login')
            }
            
            passport.authenticate('local', (err,user, info)=>{ // info is the message receiver which we sent in passport, done function mein message bheja tha
                if(err){
                    req.flash('error', info.message) //message is the key which we had set in the passport
                    return next(err)
                }

                if(!user){
                    req.flash('error', info.message) //message is the key which we had set in the passport
                    return res.redirect('/login')
                }

                //agar user hai
                req.logIn(user, (err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }
                    // if the login is successful
                    // return res.redirect('/')


                    // if it is customer then redirect to customer/orders
                    // if it s admin then redirect to admin/orders
                    return res.redirect(_getRedirectUrl(req))
                    
                })
            })(req,res,next)
        },

        register(req,res){
            res.render('auth/register')
        },

        async postRegister(req,res){ //ye async nahi tha, lekin for hashing password we made this async
            const { name, email, password } = req.body // body object se hum variables ko lene vale hai
            // this is also called object destructuring

            //validate request. 
            if(!name || !email || !password){
                req.flash('error', 'All fields are required')  //flash has 2 argument fields, the first one is which type we want to send and it is also the key, the other is the message
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')

            }
            // if everything is ok, email unique hona chahiye
            //check if email  already  exists
            User.exists({email: email},(err,result)=>{ //isme the first email is the email attribute present in the database, the other one is object which we get from frontend
                if(result){ //matlab email hai
                    req.flash('error', 'User with this Email already exists! ')  //flash has 2 argument fields, the first one is which type we want to send and it is also the key, the other is the message
                    req.flash('name',name)
                    req.flash('email',email)
                    return res.redirect('/register')
                }
            })

            // Hash Password
            const hashedPassword = await bcrypt.hash(password, 10) //second attribute is just the better encryption

            //create a USER
            const user = new User({ // isme jo email aur name hai. the first name,email are the things that are present in the database, now we are matching them with the object destructuring
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then((user)=>{
                // register hogaya hai, toh redirect kardo
                // Login karne keliye bhejenge

                return res.redirect('/')
            }).catch(err=>{
                req.flash('error', 'something went wrong')  //flash has 2 argument fields, the first one is which type we want to send and it is also the key, the other is the message
                return res.redirect('/register')
            })

            // store the user data, make a table about users. 
        },
        logout(req,res){
            req.logout()
            return res.redirect('/')
        },
    }
}

module.exports = authController