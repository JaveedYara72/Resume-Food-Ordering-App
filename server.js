// Dotenv for Cookies
require('dotenv').config()
// Express initialisation
const express = require('express')
// this is a function that is imported here
const app = express() // this object has all the functionalities that express has
const path  = require('path')
// importing the template and layout
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000 // process.env is a variable that is outside of this project, it will find a suitable address
// Database
const mongoose = require('mongoose')
// Session
const session = require('express-session')
// for cookies
const flash = require('express-flash')
// for storing sessions
const MongoDbStore = require('connect-mongo')(session)




// Database connection - this is a snippet, copy and paste it
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, {
    useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true
});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected ...');
}).catch(err=>{
    console.log('Connection Failed .. ');
});




// Session config - this will work as a middleware
app.use(session({ //passing an object here, encrypt the cookies. cookies and session go hand in hand
    secret: process.env.COOKIE_SECRET,
    resave: false,
    // store: mongoStore,
    saveUninitialized:false,
    cookie: {maxAge:1000 * 60 * 60 * 24} // this is the lifetime of the cookie, here it is 24 hours
}))
app.use(flash()) // this also a middleware, this sets a cookie if it doesn't exist.


//Assets
app.use(express.static('public')) // .static is a middle ware, 'public' is also the folder


// Time to set the template engine
app.use(expressLayout) //layouts are what we use for dynamic content keeping the headers constant, rendering everything else. we have to do something else.
app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine','ejs')

//routes -> go to web.js for further details
require('./routes/web')(app) // in web.js, wo waha pe function tha isiliye, hum yaha pe usko send kiya, fir execute hone keliye () symbol diya hai


app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})



