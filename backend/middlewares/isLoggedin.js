const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json("You have to login first"); 
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel.findOne({ email: decoded.email }).select('-password');
    if (!user) {
      return res.status(404).json("User not found");
    }
    req.user = user;
    next(); 
  } catch (error) {
    console.log(error.message);
    return res.status(401).json(error.message); 
  }
};
