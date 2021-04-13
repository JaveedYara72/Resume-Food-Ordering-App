// jitna bhi client ka code hoga yaha pe hoga
//aur yaha pe compile hone ke baad (we compile using tools),
// wo jaake public ka js folder mein save hoga and from there, we include them into the index.js

import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'
import moment from 'moment'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')


function updateCart(pizza){
    // server pe request bhejo, add that object to Cart
    // AJAX call lagao, Use axios
    axios.post('/update-cart',pizza)
    .then(res =>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000, //these are in milliseconds
            text: "Item Added to the cart",
            progressBar:false,
        }).show();
    }).catch(err =>{
        new Noty({
            type: 'error',
            timeout: 1000, //these are in milliseconds
            text: "Something Went Wrong",
            progressBar:false,
        }).show();
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        console.log(e)
        // send request to pizza and add pizza to cart
        let pizza = JSON.parse(btn.dataset.pizza) // this is a JSON string, dataset is equivalent to data-xxxx tag in html. we are just calling it here, now we are converting it to an object
        updateCart(pizza)
    })
})

//Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}




// this is part 9, where we are updating the order
// jo order mila hoga singleOrder ko, ussko leke, we'll have to render updated status
// change order status

let hiddenInput = document.querySelector('#hiddenInput')
let order =  hiddenInput ? hiddenInput.value : null
order = JSON.parse(order) 
let time   = document.createElement('small')

let statuses = document.querySelectorAll('.status_line')

function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true
    statuses.forEach((status)=>{
         let dataProp = status.dataset.status // this will get all the data-status present in singleOrder.ejs

        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
        }
    })   

}

updateStatus(order) // lekin order receive kaise karenge?

// Socket
let socket = io()


// Join
if(order){
    socket.emit('join',`order_${order._id}`)
}
// order_917391290Ef298 this is how it will look like

let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')){
    initAdmin(socket)
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated',()=>{
    const updatedOrder = { ...order} // copied the order object
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000, //these are in milliseconds
        text: "Order Updated",
        progressBar:false,
    }).show();
})

