function auth(req,res,next){
    // next is just a callback
    if(req.isAuthenticated()){ //agar user logged hai ya nahi
        return next()
    }else{
        return res.redirect('/login')
    }
}

module.exports = auth