function guest (req,res,next){
    if(!req.isAuthenticated()){ //agar logged in nahi hai, toh ye function chalao
        return next()
    }
    //else
    return res.redirect('/') // agar hai toh redirect karo
}

module.exports = guest