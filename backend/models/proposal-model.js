const mongoose = require('mongoose');

const proposalSchema = mongoose.Schema({
    bidAmount: String,
    message: String,
    status: String,
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freelancer'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    },
    
})
module.exports = mongoose.model("proposal", proposalSchema);