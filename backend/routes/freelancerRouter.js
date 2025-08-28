const express = require('express');
const app = express();
const freelancerModel = require('../models/freelancer-model');
const userModel = require('../models/user-model');
const proposalModel = require('../models/proposal-model');
const jobModel = require('../models/job-model');
const { status } = require('express/lib/response');
const { route } = require('./freelancerRouter');
const router = express.Router();



router.get('/:id',async (req, res) => {
  try {
    const freelancer = await freelancerModel.findOne({_id:req.params.id});
    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }
    const user = await userModel.findOne({_id: freelancer.userid});
    res.json({ freelancer, user });
    
  } catch (error) {
   // res.status(500).json({ message: error.message });
   res.send(error.message);
  }
});


router.get('/freelancers/details', async(req, res)=>{
  try {
    let freelancers = await freelancerModel.find({});
    if(!freelancers){
      res.json({message: "freelancer not found"});
    }

    res.json({freelancers});
  } catch (error) {
    res.json(error.message);
  }
})

router.get('/client/jobs/:id', async(req, res)=>{
  try {
    let jobs = await jobModel.find({});
    if(!jobs){
      res.json({message: "Jobs Not found"})
    }
    let freelancer = await freelancerModel.findOne({_id: req.params.id}).populate('savedJobs');
    savedJobs = freelancer.savedJobs;
    res.json({jobs, savedJobs});
    
  }catch (error) {
    res.json(error.message);
  }
})

router.get('/job/:jobId/:freelancerId', async(req, res)=>{
  try {
    let {jobId, freelancerId} = req.params;
    jobId = jobId.trim();

    freelancerId = freelancerId.trim();
    
    
    let proposal = await proposalModel.findOne({jobId, freelancerId});
    if(!proposal){
      res.status(400).json({isCreated: false});
    }else{
      res.status(200).json({isCreated: true, proposal});
    }
  } catch (error) {
    res.json(error.message);
  }
})

router.post('/proposal', async (req, res)=>{
  try {
  let {freelancerId, jobId, message, bidAmount} = req.body;
    let proposal = await proposalModel.findOne({jobId, freelancerId})
     if(proposal){
      res.status(400).json({message: "Proposal already submitted for this job"});
     }else{

        proposal = await proposalModel.create({
        bidAmount,
        message,
        status: "Submitted",
        jobId,
        freelancerId
      })
      let job = await jobModel.findOne({_id: jobId});
      job.proposals.push(proposal._id);
      await job.save();
      let freelancer = await freelancerModel.findOne({_id: freelancerId});
      freelancer.proposalId.push(proposal._id);
      await freelancer.save();
      res.json({proposal, freelancer, job})
    }
  } catch (error) {
    res.json(error.message)
    console.log(error.message);
  }
})

router.delete('/proposal/:id', async(req, res)=>{
  try {
    let deleteProposal = await proposalModel.findOneAndDelete({_id : req.params.id});
    if (!deleteProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.status(200).json({ message: "Proposal deleted successfully", deleteProposal });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/jobs/save/:id', async (req, res)=>{
  try {

    let freelancer = await freelancerModel.findOne({_id: req.body.freelancerId});
    let job = await jobModel.findOne({_id: req.params.id});
    if(freelancer.savedJobs.includes(req.params.id)){
      freelancer.savedJobs.remove(req.params.id);
      freelancer = await freelancer.save();
      job.isSaved = false;
      await job.save();
    }else{
      freelancer.savedJobs.push(req.params.id);
      freelancer = await freelancer.save();
      job.isSaved = true;
      job.save();
    }
    
    let freelancers = await freelancerModel.findOne({_id: req.body.freelancerId}).populate('savedJobs');
    savedjobs = freelancers.savedJobs;
    let isSaved = job.isSaved;
    res.status(201).json({savedjobs, isSaved});
  } catch (error) {
    res.json(error.message);
    console.log(error.message);
  }

})



module.exports = router;