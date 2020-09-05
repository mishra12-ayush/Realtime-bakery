
function cartController() {
    return {
        index(req,res){
            res.render('customers/cart')
        }, 

        update(req,res){
            // if the cart is initially empty i.e the session did'nt have a cart , then add basic object structure
            if(!req.session.cart) {
                req.session.cart = {
                    items :{},
                    totalQty :0 ,
                    totalPrice : 0
                }
                
            }
            let cart =req.session.cart
            console.log(req.body)
            // if item does not exist in cart
            if(!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty : 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            // if cart already has an item
            else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            return res.json({totalQty : req.session.cart.totalQty}) 
        }
    }
}

module.exports= cartController;