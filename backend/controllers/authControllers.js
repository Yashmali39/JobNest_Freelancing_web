const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/genereteToken')
module.exports.createUser = async (req, res) => {
    let { first_name, last_name, email, password, role} = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            res.status(201).json({ message: "User Exist" });
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    let user = await userModel.create({
                        first_name,
                        last_name,
                        email,
                        role,
                        password: hash
                    })
                    let token = generateToken(user);
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: false, // true if using HTTPS
                        sameSite: 'None' // or 'Lax' if your frontend is same-origin
                    });
                    res.status(201).json({
                        message: "User Created",
                        user: {
                            _id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            role: user.role
                        }
                    });

                })
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            res.status(201).json({ message: "Something Went Wrong" });
        } else {
           bcrypt.compare(password, user.password, (err, result)=>{
            if(result){
                let token = generateToken(user);
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: false, // true if using HTTPS
                        sameSite: 'None' // or 'Lax' if your frontend is same-origin
                    });
                    res.status(201).json({
                        message: "User Loggedin",
                        user
                    })
            }else{
                res.status(201).json({ message: "Something Went Wrong" });
            }
           })
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.logout = async (req, res) =>{
    res.cookie('token', "", {
                        httpOnly: true,
                        secure: false, // true if using HTTPS
                        sameSite: 'None' // or 'Lax' if your frontend is same-origin
                    });
                    res.send("logout successfully")
}