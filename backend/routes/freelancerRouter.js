const express = require('express');
const app = express();
const freelancerModel = require('../models/freelancer-model');
const userModel = require('../models/user-model');
const jobModel = require('../models/job-model');
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

router.get('/client/jobs', async(req, res)=>{
  try {
    let jobs = await jobModel.find({});
    if(!jobs){
      res.json({message: "Jobs Not found"})
    }
    res.json({jobs});
  }catch (error) {
    res.json(error.message);
  }
})




module.exports = router;