const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
module.exports = async function(req, res, next){
    if(!req.cookies.token){
        res.send("You have to login first");
        return res.redirect('/');
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
        .findOne({email: decoded.email})
        .select('-password');
        req.user = user;
        next();
    } catch (error) {
        req.send("error", " Something went wrong");
        console.log(error.message);
        res.redirect("/");
    }
}