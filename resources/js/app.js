// jitna bhi client ka code hoga yaha pe hoga
//aur yaha pe compile hone ke baad (we compile using tools),
// wo jaake public ka js folder mein save hoga and from there, we include them into the index.js

import axios from 'axios'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    // server pe request bhejo, add that object to Cart
    // AJAX call lagao, Use axios
    axios.post('update-cart',pizza)
    .then(res =>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty
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