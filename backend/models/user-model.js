const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String,
    
    freelancerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freelancer',
     },
    clientid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
     }
})
module.exports = mongoose.model("user", userSchema);