const express = require('express');
const app = express();
const userModel = require('../models/user-model');
const router = express.Router();
const { createUser, loginUser, logout } = require('../controllers/authControllers');
const freelancerRouter = require('./freelancerRouter');
const freelancerModel = require('../models/freelancer-model');
router.get("/", (req, res) => {
    res.send("Hi User");
})
router.post('/create', createUser);

router.post('/login', loginUser);

router.post('/freelancer/create/:id', async (req, res) => {

    let { profession,
        experience,
        education,
        language,
        skills,
        description,
        address,
        city,
        country,
        pincode,
        phoneNumber,
        userid
    } = req.body;
    try {
        let freelancer = await freelancerModel.create({
            profession,
            experience,
            education,
            language,
            skills,
            description,
            address,
            city,
            country,
            pincode,
            phoneNumber,
            userid: req.params.id
        })
        let user = await userModel.findOne({_id: req.params.id});
        user.freelancerid = freelancer._id;
        await user.save();
        res.status(201).json({
            message: "Freelancer Created",
            freelancer: {
                _id: freelancer._id,
                profession: freelancer.profession,
                experience: freelancer.experience,
                education: freelancer.education,
                language: freelancer.language,
                skills: freelancer.skills,
                description: freelancer.description,
                address: freelancer.address,
                city: freelancer.city,
                country: freelancer.country,
                pincode: freelancer.pincode,
                phoneNumber: freelancer.phoneNumber,
                userid: freelancer.userid
            }
        });
    } catch (error) {
        res.send(error.message);
    }
})

router.get('/logout', logout);

module.exports = router;