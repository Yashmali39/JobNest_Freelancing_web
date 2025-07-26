const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freelancer',
     },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
     }
})
module.exports = mongoose.model("user", userSchema);