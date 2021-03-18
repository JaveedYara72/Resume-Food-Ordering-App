const localStrategy = require('passport-local').Strategy
// the above function is actually a class
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport){
    passport.use(new localStrategy({usernameField: 'email'}, async (email, password, done)=>{ // done is just the name of the callback function
        // Login
        //check if email exits
        const user = await User.findOne({email:email}) // we will get the user if it matches

        if(!user){
            return done(null, false, {message: 'No user with this email'}) // message keyword here is just a key. 
        }

        bcrypt.compare(password, user.password).then(match=>{
            if(match){
                return done(null,user, {message: 'Logged in succesfully'})
            }
            return done(null,false,{message: 'Wrong Username or Password'})
        }).catch(err=>{
            return done(null,false,{message: 'Something went wrong'})
        })
    })) //pehla wala object hoga humara pehla datafield

    passport.serializeUser((user,done)=>{
        done(null,user._id) //session ke andar store hojayega ki agar user logged in hai ki nahi
    }) //agar user login hojata hai, session ke andar store karne keliye, it basically gives you option to store anything 

    passport.deserializeUser((id, done)=>{
        User.findById(id,(err,user)=>{
            done(err, user)
        }) //user is the data we get
    })

}

module.exports = init