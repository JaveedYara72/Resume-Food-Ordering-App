const { render } = require('sass')
const Menu = require('../../models/menu')

function homeController(){ //the function should have the same name as the controller
     // we are gonna use factory functions, it is a pattern in javascript
    // factory functions returns objects, thats it

    return {
        // jo bhi routes ka logic hoga wo, controller ka responsibility hai
        // if we are reading a page, called index.

        async index(req,res){ //below implementation is the same as of this
            // Data base ka logic yaha pe karo aur render karte wqat usko object jaise render karo, just like a context in django
            
            const pizzas  = await Menu.find()
            return res.render('home',{pizzas:pizzas})
            
            
            // Menu.find().then(function(pizzas){ //this event is getting pizza, kuch bhi naam de sakte ho, basically that is the data that is fetched from the database 
            //     console.log(pizzas)
            //     res.render('home', {pizzas : pizzas}) //res kaha se milta hai, go to web.js, we sent a slash, and a anonymous function which has req, res
            //     // the first pizzas word is just a name of variable that will show up on frontend, second one is an object array fetched from database
            // })
            
        }                                    
        // index : function (){
        //pass
        // } 
    }
}

// this above object will replace the anonymous function present in the route call

module.exports = homeController