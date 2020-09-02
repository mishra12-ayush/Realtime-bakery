const Burger = require('../../models/burger');

function homeController() {
    return {
        index(req, res){
            Burger.find({}).then(function(burgers) {
                console.log(burgers);
                return res.render('home', { burgers: burgers });
             });
            
        }
    }
}

module.exports = homeController;