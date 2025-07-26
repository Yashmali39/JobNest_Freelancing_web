const userModel = require('../models/user-model');
const clientModel = require('../models/client-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/genereteToken')


module.exports.createUser = async (req, res) => {
  let { firstName, lastName, email, password, role } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
      firstName,
      lastName,
      email,
      role,
      password: hash,
    });
    if(user.role === "client"){
      let client = await clientModel.create({
        userId: user._id
      })
      user.clientId = client._id
      await user.save();
    }
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });
    return res.status(201).json({
      message: "User Created",
      user
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = generateToken(user);
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return res.status(200).json({
        message: "User logged in",
        user,
        islogin: true,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,   // true for HTTPS
    sameSite: 'Lax', // 'Lax' works for localhost dev
  });
  res.json("logout successfully");
};
