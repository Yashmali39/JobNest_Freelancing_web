const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
     },

    jobId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        
    }],

    freelancerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freelancer',
        
    }
    
})
module.exports = mongoose.model("client", clientSchema);