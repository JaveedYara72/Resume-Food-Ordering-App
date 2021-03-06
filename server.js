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
const MongoDbStore = require('connect-mongo').default;
// for logging in
const passport = require('passport')
// Event Emitter
const Emitter = require('events')



// Database connection - this is a snippet, copy and paste it
const url = 'mongodb://localhost/pizza';
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true
});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected ...');
}).catch(err=>{
    console.log('Connection Failed .. ');
});

//Event Emitter
// Create an Emitter
const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter) // we can use eventEmitter throughout the app now

// Session config - this will work as a middleware
app.use(session({ //passing an object here, encrypt the cookies. cookies and session go hand in hand
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized:false,
    store: MongoDbStore.create({mongoUrl:process.env.MONGO_URL}),
    cookie: {maxAge:1000 * 60 * 60 * 24} // this is the lifetime of the cookie, here it is 24 hours
}))
app.use(flash()) // this also a middleware, this sets a cookie if it doesn't exist.


// passport config -- ! Always session ke baad passport ayega !
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


//Assets
app.use(express.static('public')) // .static is a middle ware, 'public' is also the folder
app.use(express.urlencoded({extended: false})) // this is for the re body that we receive from the form
// for reading the json files in express
app.use(express.json())


//Global Middleware
app.use((req,res, next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next() // calling next is important
})

// Time to set the template engine
app.use(expressLayout) //layouts are what we use for dynamic content keeping the headers constant, rendering everything else. we have to do something else.
app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine','ejs')


//routes -> go to web.js for further details
require('./routes/web')(app) // in web.js, wo waha pe function tha isiliye, hum yaha pe usko send kiya, fir execute hone keliye () symbol diya hai
app.use((req,res)=>{
    res.status(404).render('errors/404.ejs')
})

const server = app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})

// for socket
const io = require('socket.io')(server)
io.on('connection',(socket)=>{
    // make private rooms
    // jOin the client into our room
    // every room name is unique
    console.log(socket.id)
    socket.on('join',(orderId)=>{
        console.log(orderId)
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data)
})

eventEmitter.on('orderPlaced',(data)=>{
    io.to('adminRoom').emit('orderPlaced',data)
})



