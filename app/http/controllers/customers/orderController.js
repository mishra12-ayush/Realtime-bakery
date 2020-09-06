const Order = require('../../../models/order')

function orderController () {
    return {
        store(req,res){
            // validate request 
            const { phone, address } = req.body
            if(!phone || !address) {
                req.flash('error', 'Both fields are required')
                return res.redirect('/cart')
            }
            // create an order
            const order= new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })

            order.save().then(result => {
                req.flash('success', 'Order placed Successfully')
                delete req.session.cart // delete the cart after order place
                return res.redirect('/customer/orders')
            }).catch( err => {
                req.flash('error','Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req, res) {
            const orders = await Order.find({ customerId : req.user._id }, null , {sort : {createdAt: -1}})
            res.render('customers/orders', {orders: orders})
        }
    }
}
 
module.exports = orderController