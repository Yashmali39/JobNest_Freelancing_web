const mongoose = require('mongoose');

const freelancerSchema = mongoose.Schema({
    resume: String,
    profession: String,
    experience: String,
    education: String,
    language: {
        type: Array,
        default: []
    },
    skills: {
        type: Array,
        default: []
    },
    description: String,
    address: String,
    city: String,
    country: String,
    pincode: Number,
    phoneNumber: String,
    userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 }
},{
    timestamps: true
})

module.exports = mongoose.model("freelancer", freelancerSchema);