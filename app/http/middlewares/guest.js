// if user is logged in , he should not be redirected to /login or /register

function guest(req,res,next){
    if(!req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

module.exports =guest