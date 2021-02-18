const express = require('express')
// this is a function that is imported here

const app = express() // this object has all the functionalities that express has

const path  = require('path')

//importing the template and layout
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')

const PORT = process.env.PORT || 3000 // process.env is a variable that is outside of this project, it will find a suitable address

app.get('/',(req,res)=>{
    // res.send("Hello from server") -> this will be used when there is no rendering involved
    res.render('home')
})

// Time to set the template engine
app.use(expressLayout)
app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine','ejs')

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})


