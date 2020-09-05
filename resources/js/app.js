import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter')

function updateCart(burger){
    axios.post('/update-cart', burger).then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout : 1000,
            progressBar : false,
            text: 'Item added to cart'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout : 1000,
            progressBar : false,
            text: 'omething went wrong'
        })
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let burger = JSON.parse(btn.dataset.burger)
        updateCart(burger)
        console.log(burger)
    })
})