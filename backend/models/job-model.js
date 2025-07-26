const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: String,
    discription: String,
    budget: String,
    skills: {
        type: Array,
        default: []
    },
    
    timeline: String,
    proposals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proposal'
    }],
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
     }
})
module.exports = mongoose.model("job", jobSchema);